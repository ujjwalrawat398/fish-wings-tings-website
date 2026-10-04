import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  date: date("date").notNull(),
  time: varchar("time", { length: 10 }).notNull(),
  partySize: integer("party_size").notNull(),
  occasion: varchar("occasion", { length: 60 }),
  notes: text("notes"),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Reservation = typeof reservations.$inferSelect;
export type NewReservation = typeof reservations.$inferInsert;
