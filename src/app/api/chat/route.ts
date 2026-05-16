import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { getSystemPrompt } from "@/lib/systemPrompt";
import {
  checkOrigin,
  enforceBodyLimit,
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

  const tooBig = enforceBodyLimit(req, 64 * 1024);
  if (tooBig) return tooBig;

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

  // Most recent user turn — what we'll log alongside Vanessa's response.
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const turnIndex = messages.filter((m) => m.role === "user").length;

  // Body wins over cookie — the chat widget sends the active locale
  // explicitly so a mid-session language switch is reflected in Vanessa's
  // very next reply, even if the cookie hasn't been refreshed yet.
  const rawLocale =
    body && typeof body === "object" && "locale" in body
      ? (body as { locale: unknown }).locale
      : null;
  const cookieMatch = req.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)lang=(en|ru|de)/);
  const locale =
    typeof rawLocale === "string" && /^(en|ru|de)$/.test(rawLocale)
      ? rawLocale
      : (cookieMatch?.[1] ?? "en");

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

  // Stream Claude's response token-by-token. We forward each text delta
  // as a JSON line ({"text":"..."} or {"done":true} or {"error":"..."})
  // separated by newlines — simpler than SSE on the client and gives the
  // chat widget the same `read line, append to bubble` loop.
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // If the client disconnects mid-stream we tear the upstream
      // request down too, so we don't keep paying Anthropic to
      // generate tokens nobody will read.
      const upstreamController = new AbortController();
      const onClientAbort = () => upstreamController.abort();
      req.signal.addEventListener("abort", onClientAbort);

      const send = (payload: unknown) => {
        if (req.signal.aborted) return;
        controller.enqueue(
          encoder.encode(JSON.stringify(payload) + "\n"),
        );
      };

      let fullReply = "";
      let success = false;

      try {
        const upstream = await client.messages.stream(
          {
            model,
            max_tokens: 1500,
            temperature: 0.7,
            system: getSystemPrompt(locale),
            messages,
          },
          { signal: upstreamController.signal },
        );

        for await (const event of upstream) {
          if (req.signal.aborted) break;
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullReply += event.delta.text;
            send({ text: event.delta.text });
          }
        }

        if (!req.signal.aborted) {
          success = true;
          send({ done: true });
        }
      } catch (error) {
        // A client-disconnect abort surfaces here as well — that's
        // expected, not an "upstream error", so don't log it noisily.
        if (req.signal.aborted) {
          // user closed the tab / left the page — silent
        } else {
          const status =
            error instanceof Anthropic.APIError ? error.status : "network";
          console.error("[CHAT] upstream error", { status });
          send({ error: "UPSTREAM_ERROR" });
        }
      } finally {
        req.signal.removeEventListener("abort", onClientAbort);
        try {
          controller.close();
        } catch {
          // controller may already be closed if the client aborted
        }

        // Log the turn fire-and-forget so the response time the user
        // sees doesn't include a Notion roundtrip. Skip on errors so we
        // don't fill the database with empty Vanessa columns.
        if (success && lastUserMessage) {
          logChatTurn({
            sessionId,
            turnIndex,
            user: lastUserMessage,
            assistant: fullReply,
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
