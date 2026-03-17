import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const transaction = pgTable("transaction", {
  id: text("id").primaryKey(), // transactionId
  userId: text("user_id").notNull(),
  amount: integer("amount").notNull(),
  deviceId: text("device_id").notNull(),
  location: text("location"),
  riskScore: integer("risk_score").notNull(),

  // APPROVE | FLAG | DECLINE
  decision: text("decision").notNull(), 

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});