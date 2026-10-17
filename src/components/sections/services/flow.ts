import type { ServiceKey } from "@/data/services";

// The order a lead travels through the machine — not the catalogue order.
export const FLOW: readonly ServiceKey[] = ["sites", "targeting", "aibot", "automation"];

// Copy that only exists in the "machine" framing (role / pitch / points).
export const FLOW_COPY = {
  sites: { role: "svc4Role", pitch: "svc4Pitch", points: "svc4Points" },
  targeting: { role: "svc1Role", pitch: "svc1Pitch", points: "svc1Points" },
  aibot: { role: "svc3Role", pitch: "svc3Pitch", points: "svc3Points" },
  automation: { role: "svc2Role", pitch: "svc2Pitch", points: "svc2Points" },
} as const;

/** "01".."04" — position of a module in the machine. */
export function flowNumber(key: ServiceKey): string {
  return String(FLOW.indexOf(key) + 1).padStart(2, "0");
}
