/**
 * userController
 *
 * Contains logic relating to the /api/users endpoint.
 * Handles anything realted to user profiles
 */

import type { Request, Response } from "express";
import { logger } from "../lib/logger.ts";
import { betterAuthUser } from "../models/BetterUser.ts";
import Level from "../models/Level.ts";
import UserInfo from "../models/UserInfo.ts";

export const getUser = async (req: Request, res: Response) => {
  try {
    const name = req.query.name;

    const user = await betterAuthUser
      .findOne({
        name: new RegExp(`^${String(name)}$`, "i"),
      })
      .select("name createdAt");

    if (!user) {
      logger.log({
        level: "warn",
        message: `USER: User not found, does not exist (Username: ${name})`,
      });
      return res.status(404).json({ result: "Not Found" });
    }

    const userInfo = await UserInfo.findOne({userId: user._id}).select("role likedLevels");

    logger.log({
      level: "info",
      message: `USER: User retrieved (Username: ${name})`,
    });

    return res.status(200).json({ user, userInfo });
  } catch (e) {
    logger.log({
      level: "error",
      message: `USER: User retrieval error (Username: ${req.query.name}): ${e}`,
    });
    return res.status(500).json({ result: "Internal server error" });
  }
};

/**
 * getUserLevels
 *
 * Gets all levels created by a user from the database
 * @param {Request} req, contains HTTP query with: username
 * @param {Response} res, contains HTTP body with: levels
 */
export const getUserLevels = async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    const results = await Level.find({ author: name }).sort({
      dateUploaded: -1,
    });

    if (!results) {
      logger.log({
        level: "warn",
        message: `USER: User levels not retrieved, none exist (Username: ${name})`,
      });
      return res.status(204).json({ message: "No results" });
    }

    logger.log({
      level: "info",
      message: `USER: User levels retrieved (Username: ${name})`,
    });

    return res.status(200).json({
      results,
    });
  } catch (e) {
    logger.log({
      level: "error",
      message: `USER: User level retrieval error (Username: ${req.query.name}): ${e}`,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};

