"use client";

import type { ReactNode } from "react";
import { useLit } from "@/components/ui/useLit";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({ children, delay = 0, className }: Props) {
  const { ref, lit } = useLit<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`dimText${lit ? " dimTextLit" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${Math.min(delay, 0.4)}s` } : undefined}
    >
      {children}
    </div>
  );
}
