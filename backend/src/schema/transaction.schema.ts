import { pgTable, text, integer, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./user.schema.js";


export const transaction = pgTable("transaction", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`), // transactionId
  userId: text("user_id").notNull(), // references users(upi_id)
  amount: integer("amount").notNull(),
  deviceId: text("device_id").notNull(),
  location: text("location"),
  riskScore: integer("risk_score").notNull(),

  // APPROVE | FLAG | DECLINE
  decision: text("decision").notNull(), 

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
}, (t) => [
  foreignKey({
    columns: [t.userId],
    foreignColumns: [users.upiId],
  }),
]);