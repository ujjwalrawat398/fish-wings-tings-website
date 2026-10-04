"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, ChevronDown, Loader2, Users } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const TIMES = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30",
];

const OCCASIONS = ["Just because", "Birthday", "Date night", "Family feast", "Business", "Celebration"];

const inputClass =
  "w-full rounded-xl border border-line bg-ink px-5 py-4 text-sm text-cream placeholder:text-clay outline-none transition-all duration-300 focus:border-sun focus:ring-2 focus:ring-sun/25";

type Status = "idle" | "loading" | "success" | "error";

export default function ReservationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ name: string; date: string; time: string; partySize: number } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      date: String(data.get("date") || ""),
      time: String(data.get("time") || ""),
      partySize: Number(data.get("partySize") || 2),
      occasion: String(data.get("occasion") || ""),
      notes: String(data.get("notes") || "").trim(),
    };

    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Give us a ring instead?");
      }
      setConfirmed({
        name: payload.name,
        date: payload.date,
        time: payload.time,
        partySize: payload.partySize,
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-coal p-8 md:p-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sun/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-spice/10 blur-[100px]" />

      <AnimatePresence mode="wait">
        {status === "success" && confirmed ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.15 }}
              className="grid h-20 w-20 place-items-center rounded-full bg-sea"
            >
              <Check className="h-9 w-9 text-ink" strokeWidth={3} />
            </motion.span>
            <h3 className="mt-8 font-display text-4xl font-extrabold tracking-tight">
              Request sent, {confirmed.name.split(" ")[0]}!
            </h3>
            <p className="mt-4 max-w-md font-accent text-lg italic leading-relaxed text-sand">
              We&rsquo;ve pencilled you in for a table of {confirmed.partySize} on{" "}
              {new Date(confirmed.date + "T00:00:00").toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              at {confirmed.time}. We&rsquo;ll confirm by phone or email shortly —
              look out for a call from 020 7737 4888.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-full border border-cream/25 px-7 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:border-sun hover:text-sun"
            >
              Make another booking
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease }}
            onSubmit={onSubmit}
            className="relative space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.25em] text-sand">
                  Full name
                </label>
                <input id="name" name="name" required maxLength={120} placeholder="Brian Danclair" className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.25em] text-sand">
                  Phone
                </label>
                <input id="phone" name="phone" type="tel" required maxLength={40} placeholder="07700 900000" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.25em] text-sand">
                Email
              </label>
              <input id="email" name="email" type="email" required maxLength={200} placeholder="you@example.com" className={inputClass} />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="date" className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-sand">
                  <CalendarDays className="h-3.5 w-3.5 text-sun" /> Date
                </label>
                <input id="date" name="date" type="date" required min={today} className={`${inputClass} [color-scheme:dark]`} />
              </div>
              <div>
                <label htmlFor="time" className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.25em] text-sand">
                  Time
                </label>
                <div className="relative">
                  <select id="time" name="time" required defaultValue="19:00" className={`${inputClass} appearance-none pr-10`}>
                    {TIMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-clay" />
                </div>
              </div>
              <div>
                <label htmlFor="partySize" className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-sand">
                  <Users className="h-3.5 w-3.5 text-sun" /> Party size
                </label>
                <div className="relative">
                  <select id="partySize" name="partySize" required defaultValue="2" className={`${inputClass} appearance-none pr-10`}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-clay" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="occasion" className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.25em] text-sand">
                  Occasion
                </label>
                <div className="relative">
                  <select id="occasion" name="occasion" defaultValue="Just because" className={`${inputClass} appearance-none pr-10`}>
                    {OCCASIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-clay" />
                </div>
              </div>
              <div>
                <label htmlFor="notes" className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.25em] text-sand">
                  Notes <span className="text-clay normal-case tracking-normal">(allergies, requests)</span>
                </label>
                <input id="notes" name="notes" maxLength={500} placeholder="Extra hot sauce, birthday candle in the rum cake..." className={inputClass} />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-spice/40 bg-spice/10 px-5 py-3.5 text-sm text-spice"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-sun px-8 py-5 text-sm font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:shadow-[0_0_45px_rgba(245,179,1,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  Sending request...
                </>
              ) : (
                <>
                  Request table
                  <span className="absolute inset-0 -translate-x-full bg-spice transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </>
              )}
            </button>

            <p className="text-center text-xs leading-relaxed text-clay">
              Parties of 8+ — please call us on 020 7737 4888. We hold tables for 15 minutes.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
