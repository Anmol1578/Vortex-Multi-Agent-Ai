import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/User.js";
import { createConnection } from "mongoose";

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(app).verifyIdToken(token);
    const user = await User.findOne({ firebaseId: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseId: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }

    // For security, you should generate a session token and set it as an HTTP-only cookie. This will help prevent XSS attacks and ensure that the session is secure.

    const sessionToken = crypto.randomUUID();
    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
};
