/**
 * r2.ts - connects the project to a Cloudflare R2
 * bucket for media storage (i.e. level backgrounds,
 * level thumbnails, and level background music)
 *
 * Provides functions for uploading to the R2 bucket
 *
 * We used to ChatGPT to generate parts of this, as we did not understand
 * how to work with the AWS SDK.
 */

import fs from "node:fs/promises";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  R2_ACCESS_KEY_ID,
  R2_ACCOUNT_ID,
  R2_BUCKET_NAME,
  R2_SECRET_ACCESS_KEY,
} from "./env.ts";
import { logger } from "./logger.ts";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: `${R2_ACCESS_KEY_ID}`,
    secretAccessKey: `${R2_SECRET_ACCESS_KEY}`,
  },
});

/**
 * uploadToR2
 *
 * Uploads a multer request body file to the R2 bucket
 * @param file - the multer file to upload
 * @param type - the type of file (e.g., "background", "music")
 * @param levelID - the associated level ID
 * @returns the key of the uploaded file in R2
 */
export const uploadToR2 = async (
  file: Express.Multer.File,
  type: string,
  levelID: string,
): Promise<string> => {
  const key = `${type}/${levelID}`;
  const fileBuffer = file.buffer;
  const mimeType = file.mimetype;

  const command = new PutObjectCommand({
    Bucket: `${R2_BUCKET_NAME}`,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  try {
    await r2.send(command);
  } catch (e) {
    logger.log({
      level: "error",
      message: `SERVER: R2 command failed: Upload ${type} for level (ID: ${levelID}): ${e}`,
    });
  }

  logger.log({
    level: "info",
    message: `SERVER: R2 command success: Upload ${type} for level (ID: ${levelID})`,
  });

  // Return the public URL (if bucket has public access enabled)
  return `${key}`;
};

/** uploadThumbnailToR2
 *
 * Uploads a file from a given file path to the R2 bucket as a PNG thumbnail
 * @param filePath - the local file path of the PNG to upload
 * @param levelID - the associated level ID
 * @returns the key of the uploaded thumbnail in R2
 */
export const uploadThumbnailToR2 = async (
  filePath: string,
  levelID: string,
): Promise<string> => {
  // Read the PNG file as binary data
  const fileBuffer = await fs.readFile(filePath);

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: `thumbnail/${levelID}.png`, // add .png extension for clarity
    Body: fileBuffer,
    ContentType: "image/png",
  });

  try {
    await r2.send(command);
  } catch (e) {
    logger.log({
      level: "error",
      message: `SERVER: R2 command failed: Upload thumbnail for level (ID: ${levelID}): ${e}`,
    });
  }

  logger.log({
    level: "info",
    message: `SERVER: R2 command success: Upload thumbnail for level (ID: ${levelID})`,
  });

  return `thumbnail/${levelID}.png`;
};

/** removeFromR2
 *
 * Removes a file from the R2 bucket given its key
 * @param key - the key of the file to remove
 */
export const removeFromR2 = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  try {
    await r2.send(command);
  } catch (e) {
    logger.log({
      level: "error",
      message: `SERVER: R2 command failed: Delete media for level (File: ${key}): ${e}`,
    });
  }

  logger.log({
    level: "info",
    message: `SERVER: R2 command success: Delete media for level (File: ${key})`,
  });
};
