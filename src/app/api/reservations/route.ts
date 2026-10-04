import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reservations } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    const { name, email, phone, date, time, partySize, occasion, notes } = body as Record<string, unknown>;

    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanDate = typeof date === "string" ? date.trim() : "";
    const cleanTime = typeof time === "string" ? time.trim() : "";
    const size = Number(partySize);
    const cleanOccasion = typeof occasion === "string" ? occasion.slice(0, 60) : null;
    const cleanNotes = typeof notes === "string" ? notes.trim().slice(0, 500) : null;

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json({ ok: false, error: "Please tell us your name." }, { status: 400 });
    }
    if (!EMAIL_RE.test(cleanEmail)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!cleanPhone || cleanPhone.length < 7) {
      return NextResponse.json({ ok: false, error: "Please enter a valid phone number." }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate) || Number.isNaN(Date.parse(cleanDate))) {
      return NextResponse.json({ ok: false, error: "Please choose a valid date." }, { status: 400 });
    }
    if (!/^\d{2}:\d{2}$/.test(cleanTime)) {
      return NextResponse.json({ ok: false, error: "Please choose a valid time." }, { status: 400 });
    }
    if (!Number.isInteger(size) || size < 1 || size > 12) {
      return NextResponse.json({ ok: false, error: "Parties over 12 — please call 020 7737 4888." }, { status: 400 });
    }

    const [inserted] = await db
      .insert(reservations)
      .values({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        date: cleanDate,
        time: cleanTime,
        partySize: size,
        occasion: cleanOccasion,
        notes: cleanNotes,
        status: "pending",
      })
      .returning({ id: reservations.id });

    return NextResponse.json({ ok: true, id: inserted.id });
  } catch (err) {
    console.error("Reservation error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your request — please call us on 020 7737 4888." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [row] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(reservations);
    return NextResponse.json({ ok: true, total: row?.count ?? 0 });
  } catch {
    return NextResponse.json({ ok: false, error: "Database unavailable." }, { status: 500 });
  }
}
