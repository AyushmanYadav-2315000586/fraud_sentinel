import db from "../config/db";
import { users } from "../schema/user.schema";

export const createUser = async (req: any, res: any) => {
  try {
    const { upiId } = req.body;

    if (!upiId) {
      return res.status(400).json({ message: "upiId is required" });
    }

    await db.insert(users).values({
      upiId,
      avgTransactionAmount: 0,
      totalTransactions: 0,
      knownDevices: [],
    });

    return res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (err: any) {
    console.log(err);
    if (err?.cause?.code === "23505") {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
