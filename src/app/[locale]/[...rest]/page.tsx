import { notFound } from "next/navigation";

/**
 * Catch-all under [locale]. With the root layout living at
 * app/[locale]/layout.tsx (so <html lang> can be locale-aware), there
 * is no top-level not-found boundary anymore — this route catches every
 * unknown locale-prefixed path (middleware redirects bare paths to
 * /<locale>/...) and triggers the branded 404 in this segment.
 */
export default function CatchAllNotFound() {
  notFound();
}
