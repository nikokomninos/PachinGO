/**
 * Level
 *
 * Schema for a MongoDB document that
 * stores a level and its attributes
 */

import mongoose from "mongoose";
import Counter from "./Counter.ts";

const levelSchema = new mongoose.Schema({
  levelID: { type: Number, unique: true },
  name: { type: String, required: true, min: 1, max: 200 },
  author: { type: String, required: true, min: 1, max: 50 },
  description: { type: String, required: true, min: 0, max: 1000 },
  thumbnail: { type: String, required: true },
  pegLayout: { type: Object, required: true },
  backgroundImage: { type: String, required: true },
  backgroundImageOpacity: { type: Number, required: true },
  backgroundImageHSL: { type: Object, required: true },
  backgroundMusic: { type: String, required: true },
  musicSelect: { type: Number, required: true },
  wallHSL: { type: Object, required: true },
  scoreHSL: { type: Object, required: true },
  crystalHSL: { type: Object, required: true },
  numOrange: { type: Number, required: true },
  numBalls: { type: Number, required: true },
  dateUploaded: { type: Date, required: true },
  likes: { type: Number, required: false },
  plays: { type: Number, required: false },
  //scores: { type: Object }
});

/**
 * We used how to use ChatGPT to figure out how to
 * handle auto-incrementation in MongoDB, since it's not supported
 * innately.
 *
 * Prompt: "How can I add an auto-incrementing level ID for each
 * level? This is what my mongoose model looks like *pasted code*"
 *
 * The code below was added, it runs before a level is added
 * to the database.
 */

levelSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "levelId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    this.levelID = counter.seq;
  }
  next();
});

export default mongoose.model("Level", levelSchema);
