import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { getSystemPrompt } from "@/lib/systemPrompt";
import {
  checkOrigin,
  enforceBodyLimit,
  forbiddenOriginResponse,
  getClientIp,
  isFirstSeen,
  normalizeContactKey,
  rateLimit,
  rateLimitResponse,
} from "@/lib/apiGuard";
import { logChatTurn } from "@/lib/notion";
import { deliverLead, isAnyLeadChannelConfigured } from "@/lib/leadDelivery";
import { isLeadBudget, isLeadPackage } from "@/lib/leadDraft";
import { isPlausibleContact } from "@/lib/contactValidation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_HISTORY = 20;
const MAX_CONTENT_LENGTH = 4000;
// Cap how many tool round-trips we let Vanessa take per request, so a
// misbehaving model can't loop the lead pipeline indefinitely.
const MAX_TOOL_ROUNDS = 3;

const LEAD_LIMITS = {
  name: 100,
  contact: 200,
  business: 500,
  request: 2000,
};

// Tools Vanessa can call to actually move a lead to the team instead of
// just telling the visitor to fill a form herself.
const TOOLS: Anthropic.Tool[] = [
  {
    name: "submit_lead",
    description:
      "Send a qualified lead straight to the Seventy Times team (Telegram + " +
      "CRM + email). Call this ONLY after the visitor has explicitly given " +
      "their name and a contact (email, @username, or phone) and agreed to " +
      "be contacted. Never invent contact details. After it succeeds, " +
      "confirm to the visitor that the team will reach out.",
    input_schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The visitor's name, as they gave it.",
        },
        contact: {
          type: "string",
          description:
            "Best way to reach them: email, @username (Telegram/Instagram), " +
            "or phone number — exactly as the visitor provided it.",
        },
        business: {
          type: "string",
          description:
            "What the visitor does — niche / company / product. Summarise " +
            "from the conversation.",
        },
        request: {
          type: "string",
          description:
            "A concise summary of what the visitor wants and any relevant " +
            "context surfaced in the chat (goals, channels, geo).",
        },
        package: {
          type: "string",
          enum: ["not_sure", "standalone", "launch", "growth", "scale"],
          description:
            "Which offering fits best, if it became clear in the chat.",
        },
        budget: {
          type: "string",
          enum: ["not_sure", "under_1k", "1k_3k", "3k_10k", "10k_plus"],
          description: "Monthly budget range, if the visitor indicated one.",
        },
      },
      required: ["name", "contact", "request"],
    },
  },
  {
    name: "open_lead_form",
    description:
      "Open the full lead form on the visitor's screen. Use this when the " +
      "visitor would rather fill in a form than leave their details in the " +
      "chat. After calling it, briefly tell them the form is open.",
    input_schema: {
      type: "object",
      properties: {},
    },
  },
];

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

type ToolOutcome = {
  /** Text fed back to Claude as the tool_result content. */
  text: string;
  /** Marks the tool_result as an error so Claude recovers gracefully. */
  isError?: boolean;
  /** Optional signal forwarded to the widget (e.g. open the form). */
  action?: "open_form" | "lead_captured";
};

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
  // "ua" is the legacy Ukrainian value (pre-/uk slug); accept and
  // normalize it — cookies live for a year.
  const cookieMatch = req.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)lang=(en|ru|de|uk|ua)/);
  const picked =
    typeof rawLocale === "string" && /^(en|ru|de|uk|ua)$/.test(rawLocale)
      ? rawLocale
      : (cookieMatch?.[1] ?? "en");
  const locale = picked === "ua" ? "uk" : picked;

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

  // Execute one of Vanessa's tool calls. Captures leads through the same
  // fan-out the website forms use, validating the same way `/api/lead`
  // does so a chat lead is held to the same bar as a form lead.
  async function runTool(name: string, input: unknown): Promise<ToolOutcome> {
    if (name === "open_lead_form") {
      return {
        text:
          "The lead form is now open on the visitor's screen. Tell them it's " +
          "ready and the team will get it once they submit.",
        action: "open_form",
      };
    }

    if (name !== "submit_lead") {
      return { text: "Unknown tool.", isError: true };
    }

    const inp = (input ?? {}) as Record<string, unknown>;
    const leadName = typeof inp.name === "string" ? inp.name.trim() : "";
    const contact = typeof inp.contact === "string" ? inp.contact.trim() : "";
    const business =
      typeof inp.business === "string" ? inp.business.trim() : "";
    const request = typeof inp.request === "string" ? inp.request.trim() : "";
    const leadPackage = isLeadPackage(inp.package) ? inp.package : undefined;
    const leadBudget = isLeadBudget(inp.budget) ? inp.budget : undefined;

    if (!leadName || !contact) {
      return {
        text:
          "Cannot submit: the name or contact is missing. Ask the visitor " +
          "for the missing detail — do not make it up.",
        isError: true,
      };
    }
    if (!isPlausibleContact(contact)) {
      return {
        text:
          "The contact doesn't look valid (need an email, an @username, or a " +
          "phone with at least 5 digits). Ask the visitor to confirm it.",
        isError: true,
      };
    }
    if (
      leadName.length > LEAD_LIMITS.name ||
      contact.length > LEAD_LIMITS.contact ||
      business.length > LEAD_LIMITS.business ||
      request.length > LEAD_LIMITS.request
    ) {
      return {
        text: "One of the fields is too long — shorten the summary and retry.",
        isError: true,
      };
    }
    if (!isAnyLeadChannelConfigured()) {
      return {
        text:
          "Lead delivery isn't configured server-side. Apologise and give the " +
          "direct contacts: Telegram @seventytimes or email " +
          "info@seventy-times.com.",
        isError: true,
      };
    }

    const dedupKey = `lead-dedup:${normalizeContactKey(contact)}`;
    const isDuplicate = !isFirstSeen(dedupKey, 60 * 60_000);

    const delivered = await deliverLead(
      {
        name: leadName,
        contact,
        business: business || "—",
        request: request || "—",
        package: leadPackage,
        budget: leadBudget,
      },
      { duplicate: isDuplicate, kind: "lead", locale, source: "chat" },
    );

    if (!delivered) {
      return {
        text:
          "Delivery failed on every channel. Apologise and give the direct " +
          "contacts: Telegram @seventytimes or email info@seventy-times.com.",
        isError: true,
      };
    }

    console.log("[CHAT] lead captured", {
      at: new Date().toISOString(),
      duplicate: isDuplicate,
    });

    return {
      text:
        "Lead delivered to the Seventy Times team. Warmly confirm to the " +
        "visitor that the team has their request and will reach out shortly " +
        "with the pricelist and next steps. Keep it short.",
      action: "lead_captured",
    };
  }

  // Stream Claude's response token-by-token. We forward each text delta
  // as a JSON line ({"text":"..."} or {"done":true} or {"error":"..."}
  // or {"action":"..."}) separated by newlines — simpler than SSE on the
  // client and gives the chat widget the same `read line, act` loop.
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

      // The running conversation. Tool round-trips append the assistant's
      // tool_use turn and our tool_result turn here, then we re-stream.
      const convo: Anthropic.MessageParam[] = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      let fullReply = "";
      let success = false;

      try {
        for (let round = 0; ; round++) {
          const upstream = client.messages.stream(
            {
              model,
              max_tokens: 1500,
              temperature: 0.7,
              system: getSystemPrompt(locale),
              messages: convo,
              tools: TOOLS,
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

          if (req.signal.aborted) break;

          const finalMsg = await upstream.finalMessage();

          // No tool call (or we've hit the round cap) — we're done.
          if (
            finalMsg.stop_reason !== "tool_use" ||
            round >= MAX_TOOL_ROUNDS
          ) {
            success = true;
            send({ done: true });
            break;
          }

          // Run every tool the model asked for, collect the results, and
          // feed them back so it can produce the follow-up message.
          convo.push({ role: "assistant", content: finalMsg.content });
          const toolResults: Anthropic.ToolResultBlockParam[] = [];
          for (const block of finalMsg.content) {
            if (block.type !== "tool_use") continue;
            const outcome = await runTool(block.name, block.input);
            if (outcome.action) send({ action: outcome.action });
            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: outcome.text,
              is_error: outcome.isError,
            });
          }
          convo.push({ role: "user", content: toolResults });
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
