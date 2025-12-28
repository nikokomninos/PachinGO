/**
 * authController
 *
 * Contains logic relating to the /api/auth endpoint.
 * Handles user registration, login, and authentication
 */

import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.ts";
import UserInfo from "../models/UserInfo.ts";

/**
 * Register a user
 * @param {Request} req, contains HTTP body with: email, username and password
 * @param {Response} res, contains HTTP body with: status code and status message
 * @returns an HTTP status code of 201 if successful,
 * different if unsuccessful
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Checks if username and password meet requirements

    // Error if username or password is less than 5 characters
    if (req.body.username.length < 5 || req.body.password.length < 5) {
      return res.status(400).json({
        message: "Username and Password must be at least 5 characters",
      });
    }

    // Error if username or password is more than 50 characters
    if (req.body.username.length > 50 || req.body.password.length > 50) {
      return res.status(400).json({
        message: "Username and Password must be less than 50 characters",
      });
    }

    // Error if username or password contains space
    if (req.body.username.includes(" ") || req.body.password.includes(" ")) {
      return res.status(400).json({
        message: "Username and Password cannot contain spaces",
      });
    }

    // Error if password does not contain at least one uppercase character
    // v Regex pattern to do so v
    if (!/[A-Z]/.test(req.body.password)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase character",
      });
    }

    // Error if email does not follow proper format
    // v Regex pattern to do so v
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // Check if username already exists
    const exisitngUsername = await User.findOne({ username: req.body.username });
    if (exisitngUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const exisitngEmail = await User.findOne({ email: req.body.email });
    if (exisitngEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();

    const newUserInfo = new UserInfo({
      user: newUser,
      dateJoined: new Date(),
      role: "Member",
      likedLevels: []
    })
    await newUserInfo.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Log a user in
 * @param {Request} req, contains HTTP body with: email/username and password
 * @param {Response} res, contains HTTP body with: status code, status message 
 * and a cookie containing a JWT
 * @returns an HTTP status code of 200 and a cookie containing a JWT if successful,
 * a different code otherwise
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    let user;

    // If the user entered an email for the login
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.username)) {
      user = await User.findOne({ email: req.body.username });
    }

    // If the user entered a username for the login
    else {
      user = await User.findOne({ username: req.body.username });
    }

    // If the credentials do not exist
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare inputted password to actual hashed password
    const compPasswords = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!compPasswords) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ username: user.username }, "secret", { expiresIn: "1h" });

    // Put the JWT in an HTTP cookie that
    // will be included in all future
    // request bodies
    res.cookie("token", token, {
      httpOnly: true,
      //secure: false,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Logs a user out
 * @param {Request} req, contains an HTTP body with: a cookie containing a JWT
 * @param {Response} res, contains an HTTP body with: a status message and an empty auth cookie
 * @returns an HTTP status code of 200 if successful,
 * a different one otherwise, and an empty auth cookie
 */
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Checks if a user is authenticated
 * @param {Request} req, contains an HTTP body with: a cookie containing a JWT (or not)
 * @param {Response} res, contains an HTTP body with: a success status message and the username
 * of the authenticated user, otherwise a message containing an error
 */
export const checkAuth = async (req: Request, res: Response) => {
  try {
  const username = (req as any).username;
  if (!username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(200).json({ message: "Authenticated", username, });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
