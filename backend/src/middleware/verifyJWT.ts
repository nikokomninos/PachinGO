import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * I had ChatGPT help me generate this middleware for checking for authentication
 *
 * Prompt: How can I edit my middleware to reflect the new structure of
 * using an HTTP-Only cookie to hold the JWT?
 */
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, "secret");
      (req as any).username = decoded;
      next();
    } catch (e) {
      console.error(e);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
