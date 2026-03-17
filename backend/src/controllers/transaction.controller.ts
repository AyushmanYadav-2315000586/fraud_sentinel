import db from "../config/db";
import { transaction } from "../schema/transaction.schema";
import { users } from "../schema/user.schema";
import { eq } from "drizzle-orm";

export const createTransaction = async (req: any, res: any) => {
  try {
    const { userId, amount, deviceId, location } = req.body;
    if (!userId || !amount || !deviceId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.upiId, userId));

    if (existingUser.length === 0) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    await db.insert(transaction).values({
      userId,
      amount,
      deviceId,
      location,
      riskScore: 0,
      decision: "APPROVE",
    });

    const user = existingUser[0];
    if (!user) {
      return;
    }
    const newTotal = user?.totalTransactions + 1;
    const newAvg = Math.floor(
      (user.avgTransactionAmount * user.totalTransactions + amount) / newTotal,
    );
    let devices: string[] = [];

    if (Array.isArray(user.knownDevices)) {
      devices = user.knownDevices;
    }

    if (!devices.includes(deviceId)) {
      devices.push(deviceId);
    }

    await db
      .update(users)
      .set({
        avgTransactionAmount: newAvg,
        totalTransactions: newTotal,
        knownDevices: devices,
        lastTransactionTime: new Date(),
      })
      .where(eq(users.upiId, userId));

    res.status(201).json({
      message: "Transaction Created Successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(501).json({
      message: "Something went wrong",
    });
  }
};
