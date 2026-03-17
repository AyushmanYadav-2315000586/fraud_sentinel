import express from "express";
import cors from "cors";
import db from "./config/db";
import { users } from "./schema/user.schema";
import userRoutes from "./routes/user.routes";
import transactionRoutes from "./routes/transaction.routes";

// Create an instance of the Express application
const app: any = express();

/**
 * All the middlewares will be defined here.
 */
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/**
 * Routes for API endpoints will be defined here.
 */

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);




app.get("/", (req: any, res: any) => {
  res.send("Welcome to Fraud Sentinel API..");
});

app.get("/db-test", async (req: any, res: any) => {
  try {
    const result = await db.execute("SELECT 1");
    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.get("/test-insert", async (req: any, res: any) => {
  try {
    await db.insert(users).values({
      upiId: "8864809531@ptyes",
      avgTransactionAmount: 500,
      totalTransactions: 1,
      knownDevices: ["IQOO NEO 6"],
    });
    res.send("User inserted successfully");
  } catch (error) {
    res.send(error);
  }
});

// Export the app instance to be used in server.ts
export default app;
