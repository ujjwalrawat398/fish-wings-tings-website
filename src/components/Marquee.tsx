"use client";

import { Flame } from "lucide-react";
import { MARQUEE_ITEMS } from "@/lib/data";

type Variant = "filled" | "ghost" | "sun";

export default function Marquee({
  items = MARQUEE_ITEMS,
  variant = "ghost",
  fast = false,
}: {
  items?: string[];
  variant?: Variant;
  fast?: boolean;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-display text-2xl font-bold uppercase tracking-tight md:px-10 md:text-4xl ${
              variant === "ghost" ? "text-stroke-faint" : ""
            } ${variant === "filled" ? "text-ink" : ""} ${variant === "sun" ? "text-ink" : ""}`}
          >
            {item}
          </span>
          <Flame
            className={`h-5 w-5 shrink-0 md:h-6 md:w-6 ${
              variant === "ghost" ? "text-spice" : "text-ink/70"
            }`}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative flex overflow-hidden py-4 md:py-5 ${
        variant === "filled"
          ? "border-y border-ink/20 bg-sun"
        : variant === "sun"
          ? "bg-sun"
          : "border-y border-line bg-coal/40"
      }`}
    >
      <div className={`flex ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        {row}
        {row}
      </div>
    </div>
  );
}
