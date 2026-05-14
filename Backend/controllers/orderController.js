import orderModel from "../models/orderModel.js";
import userModel  from "../models/userModel.js";

const DELIVERY_CHARGE = 1500;

// ─── Helper ─────────────────────────────────────────────────────────────────
const clearCart = (userId) =>
  userModel.findByIdAndUpdate(userId, { cartData: {} });

// ─── POST /api/order/place  (Cash on Delivery) ──────────────────────────────
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing order details." });
    }

    const order = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment:       false,
      date:          Date.now(),
    });

    await order.save();
    await clearCart(userId);

    res.status(201).json({ success: true, message: "Order placed successfully." });
  } catch (error) {
    console.error("placeOrder:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST /api/order/paystack  (Paystack — initialize) ──────────────────────
// This creates the order and returns a Paystack payment URL.
// Requires PAYSTACK_SECRET_KEY in .env once you get the Paystack API key.
const placeOrderPaystack = async (req, res) => {
  try {
    const { userId, items, amount, address, email } = req.body;

    if (!userId || !items?.length || !amount || !address || !email) {
      return res.status(400).json({ success: false, message: "Missing order details." });
    }

    const order = new orderModel({
      userId,
      items,
      amount: amount + DELIVERY_CHARGE,
      address,
      paymentMethod: "Paystack",
      payment:       false,
      date:          Date.now(),
    });

    await order.save();

    // ── Paystack initialise transaction ──────────────────────────────────────
    // Uncomment and install 'paystack-node' or use axios when key is available.
    //
    // const response = await axios.post(
    //   "https://api.paystack.co/transaction/initialize",
    //   {
    //     email,
    //     amount:    (amount + DELIVERY_CHARGE) * 100,   // Paystack expects kobo
    //     reference: order._id.toString(),
    //     callback_url: `${req.headers.origin}/verify?orderId=${order._id}`,
    //     metadata: { orderId: order._id.toString(), userId },
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    //
    // const { authorization_url, reference } = response.data.data;
    // await orderModel.findByIdAndUpdate(order._id, { paystackRef: reference });
    // return res.json({ success: true, payment_url: authorization_url });
    // ─────────────────────────────────────────────────────────────────────────

    // Placeholder response until Paystack key is configured
    res.json({
      success:  true,
      orderId:  order._id,
      message:  "Order saved. Paystack key not yet configured.",
    });
  } catch (error) {
    console.error("placeOrderPaystack:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST /api/order/verifyPaystack  (Paystack — webhook / callback) ─────────
const verifyPaystack = async (req, res) => {
  try {
    const { orderId, reference } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID required." });
    }

    // ── Verify with Paystack API ──────────────────────────────────────────────
    // Uncomment when PAYSTACK_SECRET_KEY is available:
    //
    // const response = await axios.get(
    //   `https://api.paystack.co/transaction/verify/${reference}`,
    //   { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    // );
    //
    // if (response.data.data.status === "success") {
    //   await orderModel.findByIdAndUpdate(orderId, { payment: true });
    //   await clearCart(response.data.data.metadata.userId);
    //   return res.json({ success: true, message: "Payment verified." });
    // }
    //
    // return res.json({ success: false, message: "Payment not completed." });
    // ─────────────────────────────────────────────────────────────────────────

    res.json({ success: false, message: "Paystack key not yet configured." });
  } catch (error) {
    console.error("verifyPaystack:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST /api/order/list  (admin — all orders) ──────────────────────────────
const allOrders = async (_req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("allOrders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST /api/order/userorders  (user — own orders) ─────────────────────────
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("userOrders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST /api/order/status  (admin — update status) ─────────────────────────
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const validStatuses = ["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.json({ success: true, message: "Order status updated." });
  } catch (error) {
    console.error("updateStatus:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderPaystack,
  verifyPaystack,
  allOrders,
  userOrders,
  updateStatus,
};
