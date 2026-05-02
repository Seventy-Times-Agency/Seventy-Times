/**
 * Escape Telegram MarkdownV2 special chars so user input can't break
 * message formatting or inject markup. Use on every untrusted string
 * before passing it to Telegram's sendMessage with MarkdownV2.
 */
export function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, (c) => `\\${c}`);
}

export function isTelegramConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
  );
}

/**
 * Send a MarkdownV2 message to the configured Telegram chat. Resolves
 * to true on a 2xx response, false on any failure. Never throws — the
 * caller stays simple.
 */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "MarkdownV2",
        }),
      },
    );
    return res.ok;
  } catch (err) {
    console.error("[TELEGRAM] sendMessage failed", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return false;
  }
}
