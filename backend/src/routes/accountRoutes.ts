/**
 * accountRoutes
 *
 * Contains routes pertaining to account database interaction
 *
 * Uses the functions defined in accountController.ts
 */

import type { Router } from "express";
import express from "express";
import { changeProfilePicture } from "../controllers/accountController.ts";

const router: Router = express.Router();

router.post("/changeProfilePicture", changeProfilePicture);

export default router;
