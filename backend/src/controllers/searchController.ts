/**
 * searchController
 *
 * Contans logic relating to the /api/search endpoint
 * Handles logic regarding level search functionality
 */

import type { Request, Response } from "express";
import { logger } from "../lib/logger.ts";
import { betterAuthUser } from "../models/BetterUser.ts";
import Level from "../models/Level.ts";
import UserInfo from "../models/UserInfo.ts";

/**
 * Determines the sort object to be passed to Mongoose
 * when performing a query
 */
const getSort = (sort: string, order: string): object => {
  switch (sort) {
    case "date":
      switch (order) {
        case "asc":
          return { dateUploaded: 1 };
        case "desc":
          return { dateUploaded: -1 };
      }
      break;
    case "name":
      switch (order) {
        case "asc":
          return { name: 1 };
        case "desc":
          return { name: -1 };
      }
      break;
    case "plays":
      switch (order) {
        case "asc":
          return { plays: 1 };
        case "desc":
          return { plays: -1 };
      }
      break;
    case "likes":
      switch (order) {
        case "asc":
          return { likes: 1 };
        case "desc":
          return { likes: -1 };
      }
      break;
  }

  return {};
};

/**
 * Gets the most recently uploaded levels
 *
 * @param req a Request containing: limit, page
 * @param res A Response containing: results, message
 */
export const getRecentLevels = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 25;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const total = (await Level.find()).length;

    const results = await Level.find()
      .sort({ dateUploaded: -1 })
      .skip(skip)
      .limit(limit);

    logger.log({
      level: "info",
      message: "SEARCH: Most recent levels retrieved",
    });

    return res
      .status(200)
      .json({ results, total, totalPages: Math.ceil(total / limit) });
  } catch (e) {
    logger.log({
      level: "error",
      message: `SEARCH: Retrieve most recent levels error: ${e}`,
    });
    return { message: "Internal server error" };
  }
};

/**
 * Gets the most played levels
 *
 * @param req a Request containing: limit, page
 * @param res A Response containing: results, message
 */
export const getMostPlayedLevels = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 25;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const total = (await Level.find()).length;

    const results = await Level.find()
      .sort({ plays: -1 })
      .skip(skip)
      .limit(limit);

    logger.log({
      level: "info",
      message: "SEARCH: Most played levels retrieved",
    });

    return res
      .status(200)
      .json({ results, total, totalPages: Math.ceil(total / limit) });
  } catch (e) {
    logger.log({
      level: "error",
      message: `SEARCH: Retrieve most played levels error: ${e}`,
    });
    return { message: "Internal server error" };
  }
};

/**
 * Gets the most liked levels
 *
 * @param req a Request containing: limit, page
 * @param res A Response containing: results, message
 */
export const getMostLikedLevels = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 25;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const total = (await Level.find()).length;

    const results = await Level.find()
      .sort({ likes: -1 })
      .skip(skip)
      .limit(limit);

    logger.log({
      level: "info",
      message: "SEARCH: Most liked levels retrieved",
    });

    return res
      .status(200)
      .json({ results, total, totalPages: Math.ceil(total / limit) });
  } catch (e) {
    logger.log({
      level: "error",
      message: `SEARCH: Retrieve most liked levels error: ${e}`,
    });
    return { message: "Internal server error" };
  }
};

/**
 * Searches for a level by name based on a query
 *
 * @param req a Request containing: query, limit, page, sort, order
 * @param res A Response containing: results, message
 */
export const searchLevelName = async (req: Request, res: Response) => {
  try {
    const query = req.query.query;
    const limit = Number(req.query.limit) || 25;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const sort = getSort(req.query.sort as string, req.query.order as string);

    const total = (await Level.find({ name: new RegExp(String(query), "i") }))
      .length;

    const results = await Level.find({
      name: new RegExp(String(query), "i"),
    })
      .sort(sort as any)
      .skip(skip)
      .limit(limit);

    if (!results) {
      logger.log({
        level: "warn",
        message: `SEARCH: No search results: (Type: Level Name, Query: ${req.query.query})`,
      });
      return res.status(204).json({ message: "No results" });
    }

    logger.log({
      level: "info",
      message: `SEARCH: Search results retrieved (Type: Level Name, Query: ${req.query.query})`,
    });

    return res
      .status(200)
      .json({ results, total, totalPages: Math.ceil(total / limit) });
  } catch (e) {
    logger.log({
      level: "error",
      message: `SEARCH: Search error (Type: Level Name, Query: ${req.query.query}): ${e}`,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Searches for a level by ID based on a query
 *
 * @param req a Request containing: query, limit, page, sort, order
 * @param res A Response containing: results, message
 */
export const searchLevelID = async (req: Request, res: Response) => {
  try {
    const levelID = req.query.query;
    const results = await Level.find({ levelID });

    if (!results) {
      logger.log({
        level: "warn",
        message: `SEARCH: No search results: (Type: Level ID, Query: ${levelID})`,
      });
      return res.status(204).json({ message: "No results" });
    }

    logger.log({
      level: "info",
      message: `SEARCH: Search results retrieved (Type: Level ID, Query: ${levelID})`,
    });

    return res.status(200).json({ results });
  } catch (e) {
    logger.log({
      level: "error",
      message: `SEARCH: Search error (Type: Level ID, Query: ${req.query.query}): ${e}`,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Gets the most recently registered users
 *
 * @param req a Request containing: limit, page
 * @param res A Response containing: results, message
 */
export const getRecentUsers = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 25;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const total = (await betterAuthUser.find()).length;
    const results = await betterAuthUser
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const userIds = results.map((u) => u._id);

    const allUserInfos = await UserInfo.find({
      userId: { $in: userIds },
    })
      .select("userId role")
      .lean();

    const resultsWithRoles = results.map((user) => {
      const info = allUserInfos.find(
        (i) => i.userId.toString() === (user._id as any).toString(),
      );
      return {
        ...user,
        role: info?.role || "user",
      };
    });

    logger.log({
      level: "info",
      message: "SEARCH: Most recent users retrieved",
    });

    return res.status(200).json({
      results: resultsWithRoles,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (e) {
    logger.log({
      level: "error",
      message: `SEARCH: Retrieve most recent users error: ${e}`,
    });
    return { message: "Internal server error" };
  }
};

/**
 * Searches for a user by name based on a query
 *
 * @param req a Request containing: query, limit, page, order
 * @param res A Response containing: results, message
 */
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query.query;
    const limit = Number(req.query.limit) || 25;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const sort = getSort("name", req.query.order as string);

    const total = (
      await betterAuthUser.find({ name: new RegExp(String(query), "i") })
    ).length;
    const results = await betterAuthUser
      .find({ name: new RegExp(String(query), "i") })
      .select("name")
      .sort(sort as any)
      .skip(skip)
      .limit(limit)
      .lean();

    if (!results) {
      logger.log({
        level: "warn",
        message: `SEARCH: No search results: (Type: User, Query: ${query})`,
      });
      return res.status(204).json({ message: "No results" });
    }

    const userIds = results.map((u) => u._id);

    const allUserInfos = await UserInfo.find({
      userId: { $in: userIds },
    })
      .select("userId role")
      .lean();

    const resultsWithRoles = results.map((user) => {
      const info = allUserInfos.find(
        (i) => i.userId.toString() === (user._id as any).toString(),
      );
      return {
        ...user,
        role: info?.role || "user",
      };
    });

    logger.log({
      level: "info",
      message: `SEARCH: Search results retrieved (Type: User, Query: ${query})`,
    });

    return res.status(200).json({
      results: resultsWithRoles,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (e) {
    logger.log({
      level: "error",
      message: `SEARCH: Search error (Type: User, Query: ${req.query.query}): ${e}`,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};
