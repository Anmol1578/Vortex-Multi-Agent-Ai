import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import { createConnection } from "mongoose";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({ firebaseId: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseId: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
        plan: "free",
        credits: 100,
        totalCredits: 100,
      });
    }

    // For security, you should generate a session token and set it as an HTTP-only cookie. This will help prevent XSS attacks and ensure that the session is secure.

    const sessionToken = crypto.randomUUID();
    await redis.set(
      `session:${sessionToken}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExiresAt: user.planExiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    ); // Set session to expire in 7 days

    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExiresAt: user.planExiresAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    const session = req.cookies?.session;

    if (session) {
      await redis.del(`session:${session}`);
    }

    res.clearCookie("session", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: `Error logging out: ${error.message}` });
  }
};

export const updateUserPayment = async (req, res) => {
  try {
    const { plan, credits, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.plan = plan;
    user.credits += credits;
    user.totalCredits += credits;
    // Set plan expiration to 30 days from now
    user.planExiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await user.save();

    const session = req.cookies?.session;
    await redis.set(
      `session:${session}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExiresAt: user.planExiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating user payment: ${error.message}` });
  }
};
