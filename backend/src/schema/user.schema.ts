import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	upiId: text("upi_id").primaryKey(), // userId (string)
	avgTransactionAmount: integer("avg_transaction_amount").notNull().default(0),
	totalTransactions: integer("total_transactions").notNull().default(0),

	// stores array like ["device1", "device2"]
	knownDevices: jsonb("known_devices").notNull().default([]),
	 
	lastTransactionTime: timestamp("last_transaction_time", { withTimezone: true }),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});