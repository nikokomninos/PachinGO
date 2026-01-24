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

import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { format, transports } from "winston";
import { auth } from "./lib/auth.ts";
import connectDB from "./lib/db.ts";
import { logger } from "./lib/logger.ts";
import levelRoutes from "./routes/levelRoutes.ts";
import searchRoutes from "./routes/searchRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

await connectDB();

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

app.get("/api/v1/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json({ name: session?.user.name });
});

app.listen(PORT, () =>
  logger.log({
    level: "info",
    message: `SERVER: Server running on Port ${PORT}`,
  }),
);
