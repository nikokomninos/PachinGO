/**
 * accountController
 *
 * Contains logic relating to the /api/v1/account endpoint.
 * Handles anything related to public user profile information
 */

import type { Request, Response } from "express";
import multer from "multer";
import { logger } from "../lib/logger.ts";
import { removeFromR2, uploadPFPToR2 } from "../lib/r2.ts";
import { betterAuthUser } from "../models/BetterUser.ts";
import UserInfo from "../models/UserInfo.ts";

const upload = multer();

/**
 * Changes the user's profile picture, and deletes
 * the previous one from the R2 bucket
 *
 * @param {Request} req request containing a formdata body with: name, pfp (file)
 * @param {Response} res response containing: message, pfpURL
 *
 * @returns status 201 if successful
 */
export const changeProfilePicture: any[] = [
  upload.fields([{ name: "pfp", maxCount: 1 }]),
  async (req: Request, res: Response) => {
    try {
      const name = req.body.name;
      const pfp = (req.files as any).pfp[0];

      const pfpURL = await uploadPFPToR2(pfp, name);

      const user = await betterAuthUser.findOne({
        name: new RegExp(`^${String(name)}$`, "i"),
      });

      if (!user) {
        logger.log({
          level: "warn",
          message: `USER: User not found, does not exist (Username: ${name})`,
        });
        return res.status(404).json({ result: "Not Found" });
      }

      const userInfo = await UserInfo.findOne({ userId: user._id });

      if (!userInfo) return;

      if (userInfo.profilePicture) await removeFromR2(userInfo.profilePicture);
      userInfo.profilePicture = pfpURL;
      await userInfo.save();

      return res
        .status(201)
        .json({ message: "Profile Picture successfully uploaded", pfpURL });
    } catch (e) {
      logger.log({
        level: "error",
        message: `LEVEL: Profile Picture upload failed (User: ${req.body.user}): ${e}`,
      });
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];
