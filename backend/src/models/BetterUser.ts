import mongoose, { Schema } from "mongoose";

export const betterAuthUser = mongoose.model(
  "BetterUser",
  new Schema({}, { strict: false }),
  "user",
);
