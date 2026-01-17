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

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import connectDB from "./config/db.ts";
//import { populateUserInfo } from "./config/populate.ts";
//import { populateLevels } from "./config/populate.ts";
import Level from "./models/Level.ts";
import authRoutes from "./routes/authRoutes.ts";
import levelRoutes from "./routes/levelRoutes.ts";
import searchRoutes from "./routes/searchRoutes.ts";
import testRoutes from "./routes/testRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

connectDB();
//populateLevels();
//populateUserInfo();

const PORT = process.env.PORT || 3000;
const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://preview.construct.net",
      "https://pachingo.onrender.com",
      "https://playpachingo.vercel.app",
      "https://playpachingo.com",
      "https://www.playpachingo.com",
    ],
    credentials: true,
  }),
);
app.use("/api/v1", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/level", levelRoutes);

app.listen(PORT, () => console.log(`Sever running on Port ${PORT}`));
