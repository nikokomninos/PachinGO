import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { logger } from "./logger.ts";
import { sendPasswordResetEmail, sendVerificationEmail } from "./email.ts";
import { BETTER_AUTH_URL, MONGO_URI } from "./env.ts";
import UserInfo from "../models/UserInfo.ts";

const client = new MongoClient(MONGO_URI as string);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    minPasswordLength: 5,
    maxPasswordLength: 50,
    sendResetPassword: async ({ user, token }) => {
      void sendPasswordResetEmail({
        to: user.email,
        subject: "Reset your password",
        text: `${BETTER_AUTH_URL}/auth/reset/password/after?token=${token}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }) => {
      await sendVerificationEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `${BETTER_AUTH_URL}/auth/verify/after?token=${token}`,
      });
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const existingUser = await db
            .collection("user")
            .findOne(
              { name: user.name },
              { collation: { locale: "en", strength: 2 } },
            );

          if (existingUser) {
            throw new Error("NAME_ALREADY_TAKEN");
          }

          return;
        },
        after: async (user) => {
          UserInfo.insertOne({
            userId: user.id,
            role: "Member",
            likedLevels: [],
          });
          logger.log({
            level: "info",
            message: `AUTH: User Registered (ID: ${user.id}, Email: ${user.email}, Username: ${user.name})`,
          });
        },
      },
    },
    account: {
      update: {
        after: async (account) => {
          logger.log({
            level: "info",
            message: `AUTH: Account updated (UserID: ${account.userId}, AccountID: ${account.accountId})`,
          });
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          logger.log({
            level: "info",
            message: `AUTH: User Logged In (UserID: ${session.userId}, IP: ${session.ipAddress})`,
          });
        },
      },
      delete: {
        after: async (session) => {
          logger.log({
            level: "info",
            message: `AUTH: User Logged Out (UserID: ${session.userId}, IP: ${session.ipAddress})`,
          });
        },
      },
    },
  },
  onResponse: async (ctx: any) => {
    if (ctx.error) {
      logger.log({
        level: "warn",
        message: `AUTH: ${ctx.path} (Reason: ${ctx.error.message})`,
      });
    }
    return ctx;
  },
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      sameSite: "None",
      secure: true,
      httpOnly: true,
      partitioned: true,
    },
  },
});
