import crypto from "crypto";
import axios from "axios";

import { PLANS } from "../config/Plans.js";
import razorpay from "../config/razorpay.js";
import Payment from "../models/payment.model.js";

export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.headers["x-user-id"];
    const selectedPlan = PLANS[plan];

    if (!selectedPlan) {
      return res.status(404).json({ message: "Invalid plan selected" });
    }

        const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.plan === selectedPlan.id) {
      return res.status(400).json({ message: "You are already subscribed to this plan" });
    }


    const order = await razorpay.orders.create({
      amount: selectedPlan.price * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${userId}_${Date.now()}`,
    });

    await Payment.create({
      userId,
      orderId: order.id,
      amount: selectedPlan.price,
      credits: selectedPlan.credits,
      plan: selectedPlan.id,
      currency: order.currency,
      status: "created",
    });

    return res.status(200).json({ order, plan: selectedPlan });
  } catch (error) {
    return res.status(500).json({ message: `createdOrder error: ${error}` });
  }
};

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ message: "Payment verification failed" });
//     }

//     const payment = await Payment.findOne({ orderId: razorpay_order_id });

//     if (!payment) {
//       return res.status(404).json({ message: "Payment record not found" });
//     }

//     payment.status = "paid";
//     payment.paymentId = razorpay_payment_id;
//     await payment.save();

//     await axios.post(`${process.env.AUTH_SERVICE_URL}/update-plan`, {
//       userId: payment.userId,
//       plan: payment.plan,
//       credits: payment.credits,
//     });

//     return res
//       .status(200)
//       .json({ message: "Payment verified and plan updated successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: `verifyPayment error: ${error}` });
//   }
// };


export const updateUserPayment = async (req, res) => {
  try {
    const { plan, credits, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.plan = plan;
    user.credits = credits;       // reset to new plan's amount, not additive
    user.totalCredits = credits;  // same
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