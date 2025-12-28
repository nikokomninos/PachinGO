/**
 * userController
 *
 * Contains logic relating to the /api/users endpoint.
 * Handles anything realted to user profiles
 */

import type { Request, Response } from "express";
import Level from "../models/Level.ts";
import UserInfo from "../models/UserInfo.ts";

/**
 * getUser
 *
 * Gets a user's info from the database
 * @param {Request} req, contains HTTP query with: username
 * @param {Response} res, contains HTTP body with: user info
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const username = req.query.username;
    const populated = await UserInfo.find().populate({
      path: "user",
      match: { username: username },
      select: "username",
    });
    const filter = populated.filter((info) => info.user);
    const result = filter[0];

    if (!result) {
      return res.status(404).json({ result: "Not Found" });
    }

    return res.status(200).json({ result: result });
  } catch (e) {
    console.error(e);
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
    const username = req.query.username;
    const results = await Level.find({ author: username }).sort({
      dateUploaded: -1,
    });

    if (!results) {
      return res.status(204).json({ message: "No results" });
    }

    return res.status(200).json({
      results,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * getUserLikedLevels
 *
 * Gets all levels liked by a user from the database
 * @param {Request} req, contains HTTP query with: username
 * @param {Response} res, contains HTTP body with: likedLevels
 */
export const getUserLikedLevels = async (req: Request, res: Response) => {
  try {
    const username = req.query.username;
    const populated = await UserInfo.find().populate({
      path: "user",
      match: { username: username },
    });
    const filter = populated.filter((info) => info.user);
    const result = filter[0];

    if (!result) {
      return res.status(404).json({ result: "Not Found" });
    }

    return res.status(200).json({ likedLevels: result.likedLevels });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
