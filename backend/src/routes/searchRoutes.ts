/**
 * searchRoutes
 *
 * Contains routes pertaining to level search
 *
 * Uses the functions defined in searchController.ts
 */

import type { Router } from "express";
import express from "express";
import {
  getMostLikedLevels,
  getMostPlayedLevels,
  getRecentLevels,
  getRecentUsers,
  searchLevelID,
  searchLevelName,
  searchUsers,
} from "../controllers/searchController.ts";

const router: Router = express.Router();

router.get("/getRecentLevels", getRecentLevels);
router.get("/getMostPlayedLevels", getMostPlayedLevels);
router.get("/getMostLikedLevels", getMostLikedLevels);
router.get("/searchLevelName", searchLevelName);
router.get("/searchLevelID", searchLevelID);
router.get("/getRecentUsers", getRecentUsers);
router.get("/searchUsers", searchUsers);

export default router;
