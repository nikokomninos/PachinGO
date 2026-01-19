/**
 * db.ts
 * 
 * Contains logic to start bootstrap connection
 * to remote MongoDB database (MongoDB Atlas)
 */

import mongoose from "mongoose";
import { logger } from "../app.ts";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    logger.log({
      level: "info",
      message: "SERVER: MongoDB session connected",
    });
  } catch (e: unknown) {
    logger.log({
      level: "error",
      message: `SERVER: MongoDB session connection failed: ${e}`,
    });
    process.exit(1);
  }
};

export default connectDB;

