import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import {
  checkOrigin,
  forbiddenOriginResponse,
  getClientIp,
  rateLimit,
  rateLimitResponse,
} from "@/lib/apiGuard";
import { logChatTurn } from "@/lib/notion";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_HISTORY = 20;
const MAX_CONTENT_LENGTH = 4000;

function isValidMessage(m: unknown): m is IncomingMessage {
  return (
    typeof m === "object" &&
    m !== null &&
    "role" in m &&
    "content" in m &&
    ((m as IncomingMessage).role === "user" ||
      (m as IncomingMessage).role === "assistant") &&
    typeof (m as IncomingMessage).content === "string"
  );
}

export async function POST(req: Request) {
  if (!checkOrigin(req)) return forbiddenOriginResponse();

  const ip = getClientIp(req);
  const rl = rateLimit(`chat:${ip}`, 20, 60_000);
  if (!rl.ok) return rateLimitResponse(rl);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "NOT_CONFIGURED" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const rawMessages =
    body && typeof body === "object" && "messages" in body
      ? (body as { messages: unknown }).messages
      : null;

  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json(
      { error: "MISSING_MESSAGES" },
      { status: 400 }
    );
  }

  const messages: IncomingMessage[] = rawMessages
    .filter(isValidMessage)
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_CONTENT_LENGTH),
    }));

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "MISSING_MESSAGES" },
      { status: 400 }
    );
  }

  const rawSessionId =
    body && typeof body === "object" && "sessionId" in body
      ? (body as { sessionId: unknown }).sessionId
      : null;
  const sessionId =
    typeof rawSessionId === "string" && rawSessionId.length > 0
      ? rawSessionId.slice(0, 64)
      : "anon";

  // Most recent user turn — what we'll log alongside Tess's response.
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const turnIndex = messages.filter((m) => m.role === "user").length;

  const localeMatch = req.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)lang=(en|ru|de)/);
  const locale = localeMatch?.[1] ?? "en";

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

  // Stream Claude's response token-by-token. We forward each text delta
  // as a JSON line ({"text":"..."} or {"done":true} or {"error":"..."})
  // separated by newlines — simpler than SSE on the client and gives the
  // chat widget the same `read line, append to bubble` loop.
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload: unknown) => {
        controller.enqueue(
          encoder.encode(JSON.stringify(payload) + "\n"),
        );
      };

      let fullReply = "";
      let success = false;

      try {
        const upstream = await client.messages.stream({
          model,
          max_tokens: 1500,
          temperature: 0.7,
          system: SYSTEM_PROMPT,
          messages,
        });

        for await (const event of upstream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullReply += event.delta.text;
            send({ text: event.delta.text });
          }
        }

        success = true;
        send({ done: true });
      } catch (error) {
        const status =
          error instanceof Anthropic.APIError ? error.status : "network";
        console.error("[CHAT] upstream error", { status });
        send({ error: "UPSTREAM_ERROR" });
      } finally {
        controller.close();

        // Log the turn fire-and-forget so the response time the user
        // sees doesn't include a Notion roundtrip. Skip on errors so we
        // don't fill the database with empty Tess columns.
        if (success && lastUserMessage) {
          logChatTurn({
            sessionId,
            turnIndex,
            user: lastUserMessage,
            tess: fullReply,
            locale,
          }).catch((err) => {
            console.error("[CHAT] log error", {
              message: err instanceof Error ? err.message : "unknown",
            });
          });
        }
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
