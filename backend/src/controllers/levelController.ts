/**
 * levelController
 *
 * Contains logic relating to the /api/level endpoint
 * Handles anything related to database level updates
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Request, Response } from "express";
import multer from "multer";
import { logger } from "../app.ts";
import { PYTHON_PATH, SCRIPT_PATH } from "../lib/env.ts";
import { removeFromR2, uploadThumbnailToR2, uploadToR2 } from "../lib/r2.ts";
import { betterAuthUser } from "../models/BetterUser.ts";
import Counter from "../models/Counter.ts";
import Level from "../models/Level.ts";
import UserInfo from "../models/UserInfo.ts";

const upload = multer();

/**
 * deleteLevel
 *
 * Deletes a level from the database document "levels"
 * @param {Request} req a request body containing: levelID
 * @param {Response} res a response body containing: message
 */
export const deleteLevel = async (req: Request, res: Response) => {
  try {
    const level = await Level.findOne({ levelID: req.body.id });
    const result = await Level.deleteOne({ levelID: req.body.id });

    if (!result) {
      logger.log({
        level: "warn",
        message: `LEVEL: Level with ID ${req.body.levelID} not deleted`,
      });
      return res.status(204).json({ message: "Level not deleted" });
    }

    removeFromR2(`bg-image/${req.body.levelID}`);
    removeFromR2(`bg-audio/${req.body.levelID}`);
    removeFromR2(`thumbnail/${req.body.levelID}.png`);

    logger.log({
      level: "info",
      message: `LEVEL: Level deleted: ${level?.name} by ${level?.author} (ID: ${level?.levelID})`,
    });

    return res.status(200).json({ message: "Level deleted successfuly" });
  } catch (e) {
    console.error(e);
    logger.log({
      level: "error",
      message: `LEVEL: Level deletion error: ${e}`,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * uploadLevel
 *
 * Uploads a level to the database document "levels"
 * @param {Request} req a request body containing: name, author, desc, pegLayout;
 * and a request upload containing: background, music
 * @param {Response} res a response body containing: message
 */
export const uploadLevel: any[] = [
  upload.fields([
    { name: "background", maxCount: 1 },
    { name: "music", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        author,
        desc,
        pegLayout,
        backgroundImageOpacity,
        backgroundImageHSL,
        musicSelect,
        wallHSL,
        scoreHSL,
        crystalHSL,
        numOrange,
        numBalls,
      } = req.body;
      let backgroundUrl: string = "N/A";
      let musicUrl: string = "N/A";
      let thumbnailUrl: string = "N/A";

      const counter = await Counter.findOne({});
      const levelID = (counter?.seq ?? 0) + 1;
      const dateUploaded = new Date();

      // Helper to generate thumbnails
      const runThumbnailGeneration = (
        pythonPath: any,
        scriptPath: any,
        args: any,
      ) => {
        return new Promise<void>((resolve, reject) => {
          const process = spawn(
            pythonPath,
            [path.join(scriptPath, "thumbnail.py"), ...args],
            {
              cwd: scriptPath,
            },
          );

          process.stdout.on("data", (data) => console.log(data.toString()));
          process.stderr.on("data", (err) => console.error(err.toString()));

          process.on("close", (code) => {
            //console.log(`Python exited with code ${code}`);
            if (code === 0) {
              logger.log({
                level: "info",
                message: `LEVEL: Thumbnail generated: ${name} by ${author} (ID: ${levelID})`,
              });
              resolve();
            } else {
              logger.log({
                level: "warn",
                message: `LEVEL: Thumbnail failed to generate: ${name} by ${author} (ID: ${levelID})`,
              });
              reject(new Error(`Python script exited with code ${code}`));
            }
          });
        });
      };

      // If a background image is included
      if (req.files && "background" in req.files) {
        const bgFile = (req.files as any).background[0];
        backgroundUrl = await uploadToR2(
          bgFile,
          "bg-image",
          levelID!.toString(),
        );

        // Create temp dir to save background file
        const tempDir = os.tmpdir();
        const tempPath = path.join(
          tempDir,
          `${levelID}-${bgFile.originalname}`,
        );
        fs.writeFileSync(tempPath, bgFile.buffer);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        //const pythonPath = path.resolve(__dirname, "../../scripts", PYTHON_PATH!);
        const pythonPath = path.resolve(__dirname, PYTHON_PATH!);
        const scriptPath = path.resolve(__dirname, SCRIPT_PATH!);

        const outputFileName = `thumbnail_${levelID}.png`;

        await runThumbnailGeneration(pythonPath, scriptPath, [
          tempPath,
          pegLayout,
          backgroundImageOpacity,
          backgroundImageHSL,
          outputFileName,
        ]);

        thumbnailUrl = await uploadThumbnailToR2(
          path.join(scriptPath, outputFileName),
          levelID!.toString(),
        );

        fs.unlink(tempPath, (err) => {
          //if (err) console.error("Failed to delete temp file:", err);
          if (err)
            logger.log({
              level: "error",
              message: `LEVEL: Failed to delete temp dir from FS: ${err}`,
            });
        });

        fs.unlink(path.join(scriptPath, outputFileName), (err) => {
          //if (err) console.error("Failed to delete thumbnail:", err);
          if (err)
            logger.log({
              level: "error",
              message: `LEVEL: Failed to delete temp thumbnail file from FS: ${err}`,
            });
        });
      } else {
        // If there is no user-uploaded background image,
        // still generate the thumbnail
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const pythonPath = path.resolve(__dirname, PYTHON_PATH!);
        const scriptPath = path.resolve(__dirname, SCRIPT_PATH!);
        const outputFileName = `thumbnail_${levelID}.png`;

        await runThumbnailGeneration(pythonPath, scriptPath, [
          "",
          pegLayout,
          backgroundImageOpacity,
          backgroundImageHSL,
          outputFileName,
        ]);

        thumbnailUrl = await uploadThumbnailToR2(
          path.join(scriptPath, outputFileName),
          levelID!.toString(),
        );

        fs.unlink(path.join(scriptPath, outputFileName), (err) => {
          //if (err) console.error("Failed to delete thumbnail:", err);
          if (err)
            logger.log({
              level: "error",
              message: `LEVEL: Failed to delete temp thumbnail file from FS: ${err}`,
            });
        });
      }

      // If a music file is included
      if (req.files && "music" in req.files) {
        const musicFile = (req.files as any)["music"][0];
        musicUrl = await uploadToR2(musicFile, "bg-audio", levelID!.toString());
      }

      const newLevel = new Level({
        name: name,
        author: author,
        description: desc,
        thumbnail: thumbnailUrl,
        pegLayout: JSON.parse(pegLayout),
        backgroundImage: backgroundUrl,
        backgroundImageOpacity: backgroundImageOpacity,
        backgroundImageHSL: JSON.parse(backgroundImageHSL),
        backgroundMusic: musicUrl,
        musicSelect: musicSelect,
        wallHSL: JSON.parse(wallHSL),
        scoreHSL: JSON.parse(scoreHSL),
        crystalHSL: JSON.parse(crystalHSL),
        numOrange: numOrange,
        numBalls: numBalls,
        dateUploaded: dateUploaded,
        likes: 0,
        plays: 0,
      });
      await newLevel.save();

      logger.log({
        level: "info",
        message: `LEVEL: Level successfully uploaded: ${name} by ${author} (ID: ${levelID})`,
      });

      /*
      const user = await User.findOne({ username: author });
      await UserInfo.updateOne(
        { user: user!._id },
        { $push: { levels: levelID } },
      );
      */

      return res.status(201).json({
        message: "Level uploaded successfully",
        backgroundUrl,
        musicUrl,
        levelID,
      });
    } catch (e) {
      console.error(e);
      logger.log({
        level: "error",
        message: `LEVEL: Level uploaded failed (${req.body.name} by ${req.body.author}): ${e}`,
      });
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

/**
 * loadLevel
 *
 * Retrieves a level's info, to be loaded into Construct
 * @param {Request} req a request body containing: levelID
 * @param {Response} res a response body containing: message, level
 */
export const loadLevel = async (req: Request, res: Response) => {
  try {
    const level = await Level.findOne({ levelID: req.query.levelID });

    if (!level) {
      logger.log({
        level: "warn",
        message: `LEVEL: Level failed to load, does not exist: (ID: ${req.query.levelID})`,
      });
      return res.status(204).json({ message: "Level not found" });
    }

    logger.log({
      level: "info",
      message: `LEVEL: Level successfully loaded: (ID: ${req.query.levelID})`,
    });

    return res.status(200).json({ message: "Level found", level });
  } catch (e) {
    logger.log({
      level: "error",
      message: `LEVEL: Level load error (ID: ${req.query.levelID}): ${e}`,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};

/** addPlayToLevel
 *
 * Increments the play count of a level by 1
 * @param {Request} req a request body containing: levelID
 * @param {Response} res a response body containing: message
 */
export const addPlayToLevel = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id)
    const level = await Level.findOne({ levelID: id });

    if (!level) {
      logger.log({
        level: "warn",
        message: `LEVEL: Play not added to level, does not exist: (ID: ${id})`,
      });
      return res.status(204).json({ message: "Level not found" });
    }

    level.plays = (level.plays || 0) + 1;
    await level.save();

    logger.log({
      level: "info",
      message: `LEVEL: Play added to level: (ID: ${id})`,
    });

    return res.status(200).json({ message: "Play added to level" });
  } catch (e) {
    logger.log({
      level: "error",
      message: `LEVEL: Level play adding error (ID: ${req.body.id}): ${e}`,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * addLikeToLevel
 *
 * Increments the like count of a level by 1
 * @param {Request} req a request body containing: levelID
 * @param {Response} res a response body containing: message
 */
export const addLikeToLevel = async (req: Request, res: Response) => {
  try {
    const levelID = req.body.id;
    const level = await Level.findOne({ levelID: levelID });

    if (!level) {
      logger.log({
        level: "warn",
        message: `LEVEL: Like not added to level, does not exist: (ID: ${levelID})`,
      });
      return res.status(204).json({ message: "Level not found" });
    }

    const name = req.body.name;

    const user = await betterAuthUser
      .findOne({
        name: new RegExp(`^${String(name)}$`, "i"),
      })
      .select("name createdAt");

    if (!user) {
      logger.log({
        level: "warn",
        message: `LEVEL: Like not added to level, user does not exist: (User: ${name}, ID: ${levelID})`,
      });
      return res.status(404).json({ result: "User not Found" });
    }

    const userInfo = await UserInfo.findOne({userId: user._id}).select("role likedLevels");

    level.likes = (level.likes || 0) + 1;
    await level.save();

    if (!userInfo?.likedLevels?.includes(levelID))
      userInfo?.likedLevels?.push(levelID);
    await userInfo?.save();

    logger.log({
      level: "info",
      message: `LEVEL: Like added to level: (User: ${name}, ID: ${levelID})`,
    });

    return res.status(200).json({ message: "Like added to level" });
  } catch (e) {
    logger.log({
      level: "error",
      message: `LEVEL: Level like error (ID: ${req.body.id}): ${e}`,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * removeLikeFromLevel
 *
 * Removes a like from a level
 * @param {Request} req a request body containing: levelID
 * @param {Response} res a response body containing: message
 */
export const removeLikeFromLevel = async (req: Request, res: Response) => {
  try {
    const levelID = req.body.id;
    const level = await Level.findOne({ levelID: levelID });

    if (!level) {
      logger.log({
        level: "warn",
        message: `LEVEL: Like not added to level, does not exist: (ID: ${levelID})`,
      });
      return res.status(204).json({ message: "Level not found" });
    }

    const name = req.body.name;

    const user = await betterAuthUser
      .findOne({
        name: new RegExp(`^${String(name)}$`, "i"),
      })
      .select("name createdAt");

    if (!user) {
      logger.log({
        level: "warn",
        message: `LEVEL: Like not added to level, user does not exist: (User: ${name}, ID: ${levelID})`,
      });
      return res.status(404).json({ result: "User not Found" });
    }

    const userInfo = await UserInfo.findOne({userId: user._id}).select("role likedLevels");

    level.likes = (level.likes || 0) - 1;
    await level.save();

    let filtered: number[];

    if (userInfo?.likedLevels?.includes(levelID)) {
      filtered = userInfo?.likedLevels?.filter((id: number) => id !== levelID);
      userInfo.likedLevels = filtered;
    }
    await userInfo?.save();

    logger.log({
      level: "info",
      message: `LEVEL: Like removed from level: (User: ${name}, ID: ${levelID})`,
    });

    return res.status(200).json({ message: "Like removed from level" });
  } catch (e) {
    logger.log({
      level: "error",
      message: `LEVEL: Level like error (ID: ${req.body.id}): ${e}`,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};
