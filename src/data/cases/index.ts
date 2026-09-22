export * from "./types";
import type { CaseItem } from "./types";
import { eliteCarMats } from "./elitecarmats";
import { convioo } from "./convioo";
import { seventyTimes } from "./seventy-times";
import { passengerTransport } from "./passenger-transport";
import { bukovel } from "./bukovel";

// Display/source order. The landing (Cases.tsx) renders the main shelf
// first (flagship → product → own site) and the "early experience
// 2020–2021" shelf separately below it.
export const CASES: readonly CaseItem[] = [
  eliteCarMats,
  convioo,
  seventyTimes,
  passengerTransport,
  bukovel,
];
