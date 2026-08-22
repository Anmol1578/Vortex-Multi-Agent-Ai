import { PLANS } from "../config/Plans.js";
import { razorpay } from "../config/razorpay.js";
import Payment from "../models/payment.model.js";

export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.headers["x-user-id"];
    const selectedPlan = PLANS[plan];

    if (!selectedPlan) {
      return res.status(404).json({ message: "Invalid plan selected" });
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

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const payment = await Payment.findOne({ orderid: razorpay_order_id });

    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    payment.status = "paid";
    payment.paymentId = razorpay_payment_id;
    await payment.save();
  } catch (error) {}
};
