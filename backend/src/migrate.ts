import mongoose, { Types } from "mongoose";
import User from "./models/User.ts";
import UserInfo from "./models/UserInfo.ts";

const betterAuthUsers = () =>
  mongoose.connection.collection("user");

const betterAuthAccounts = () =>
  mongoose.connection.collection("account");

export async function migrateUsersToBetterAuth() {
  console.log("Starting BetterAuth migration…");

  const users = await User.find().lean();

  for (const oldUser of users) {
    // Skip users already migrated
    const alreadyExists = await betterAuthUsers().findOne({
      email: oldUser.email,
    });

    if (alreadyExists) {
      console.log(`Skipping ${oldUser.email} (already migrated)`);
      continue;
    }

    // Fetch legacy UserInfo
    const legacyInfo = await UserInfo.findOne({
      user: oldUser._id,
    }).lean();

    if (!legacyInfo) {
      console.warn(
        `Skipping ${oldUser.email}: missing UserInfo`
      );
      continue;
    }

    const now = new Date();
    const joinedAt = legacyInfo.dateJoined ?? now;

    // 1. Insert BetterAuth user
    const betterAuthUserId = new Types.ObjectId();

    await betterAuthUsers().insertOne({
      _id: betterAuthUserId,
      name: oldUser.username,
      email: oldUser.email,
      emailVerified: true,
      createdAt: joinedAt,
      updatedAt: now,
    });

    // 2. Insert BetterAuth credential account (no password)
    await betterAuthAccounts().insertOne({
      _id: new Types.ObjectId(),
      accountId: betterAuthUserId.toHexString(),
      providerId: "credential",
      userId: betterAuthUserId,
      password: null,
      createdAt: now,
      updatedAt: now,
    });

    // 3. Update existing UserInfo document IN PLACE
    await UserInfo.updateOne(
      { _id: legacyInfo._id },
      {
        $set: {
          userId: betterAuthUserId,
          role: legacyInfo.role,
          likedLevels: legacyInfo.likedLevels,
        },
        $unset: {
          user: "",
          dateJoined: "",
        },
      }
    );

    console.log(`Migrated ${oldUser.email}`);
  }

  console.log("BetterAuth migration complete.");
}
