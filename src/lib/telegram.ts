/**
 * Escape Telegram MarkdownV2 special chars so user input can't break
 * message formatting or inject markup. Use on every untrusted string
 * before passing it to Telegram's sendMessage with MarkdownV2.
 */
export function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, (c) => `\\${c}`);
}
