/**
 * Serialize a JSON-LD object for an inline `<script type="application/
 * ld+json">`. Escapes `<` to its `<` unicode form so a literal
 * `</script>` appearing inside any string value can't terminate the
 * tag early. All current inputs are developer-controlled, but this is
 * cheap defense-in-depth and future-proofs against data-driven values.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
