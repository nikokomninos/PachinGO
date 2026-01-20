/**
 * app.ts
 *
 * Bootstraps backend, including:
 * - DB connection
 * - Express server creation
 * - Express server routes
 */

import dotenv from "dotenv";

dotenv.config();

import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./lib/db.ts";
import { auth } from "./lib/auth.ts";
//import { populateUserInfo } from "./config/populate.ts";
//import { populateLevels } from "./config/populate.ts";
import levelRoutes from "./routes/levelRoutes.ts";
import searchRoutes from "./routes/searchRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import { format, transports } from "winston";
import { logger } from "./lib/logger.ts";

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

await connectDB();
//populateLevels();
//populateUserInfo();

const PORT = process.env.PORT || 9000;
const app = express();

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://preview.construct.net",
      "https://pachingo.onrender.com",
      "https://api.playpachingo.com",
      "https://playpachingo.vercel.app",
      "https://playpachingo.com",
      "https://www.playpachingo.com",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/level", levelRoutes);

app.listen(PORT, () =>
  logger.log({ level: "info", message: `SERVER: Server running on Port ${PORT}` }),
);
