/**
 * userRoutes
 *
 * Contains routes pertaining to user profiles
 *
 * Uses the functions defined in userController.ts
 */

import express from "express";
import type { Router } from "express"
import { getUser, getUserLevels } from "../controllers/userController.ts";

const router: Router = express.Router();

router.get("/getUser", getUser);
router.get("/getUserLevels", getUserLevels);

export default router;
