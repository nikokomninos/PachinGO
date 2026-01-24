/**
 * Counter
 *
 * Schema for a MongoDB document that
 * stores an auto-incrementing sequence
 * used for level IDs
 */

import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export default mongoose.model("Counter", counterSchema);
