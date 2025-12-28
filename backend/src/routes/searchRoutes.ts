/**
 * searchRoutes
 *
 * Contains routes pertaining to level search
 *
 * Uses the functions defined in searchController.ts
 */

import express from "express";
import {
  getMostLikedLevels,
  getMostPlayedLevels,
  getRecentLevels,
  searchLevelID,
  searchLevelName,
  searchUsers,
} from "../controllers/searchController.ts";

const router = express.Router();

router.post("/getRecentLevels", getRecentLevels);
router.post("/getMostPlayedLevels", getMostPlayedLevels);
router.post("/getMostLikedLevels", getMostLikedLevels);
router.post("/searchLevelName", searchLevelName);
router.post("/searchLevelID", searchLevelID);
router.post("/searchUsers", searchUsers);

export default router;
