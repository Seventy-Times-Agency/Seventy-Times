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
            send({ text: event.delta.text });
          }
        }

        send({ done: true });
      } catch (error) {
        const status =
          error instanceof Anthropic.APIError ? error.status : "network";
        console.error("[CHAT] upstream error", { status });
        send({ error: "UPSTREAM_ERROR" });
      } finally {
        controller.close();
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
