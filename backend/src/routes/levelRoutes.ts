/**
 * levelRoutes
 *
 * Contains routes pertaining to level database interaction
 *
 * Uses the functions defined in levelController.ts
 */

import type { Router } from "express";
import express from "express";
import {
  addLikeToLevel,
  addPlayToLevel,
  deleteLevel,
  editLevel,
  loadLevel,
  removeLikeFromLevel,
  uploadLevel,
} from "../controllers/levelController.ts";

const router: Router = express.Router();

router.post("/deleteLevel", deleteLevel);
router.post("/uploadLevel", uploadLevel);
router.post("/editLevel", editLevel)
router.get("/loadLevel", loadLevel);
router.post("/addPlayToLevel", addPlayToLevel);
router.post("/addLikeToLevel", addLikeToLevel);
router.post("/removeLikeFromLevel", removeLikeFromLevel);

export default router;
