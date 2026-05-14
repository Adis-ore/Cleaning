import express from "express";
import {
  placeOrder,
  placeOrderPaystack,
  verifyPaystack,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser  from "../middleware/auth.js";

const orderRouter = express.Router();

// User — place orders
orderRouter.post("/place",          authUser,   placeOrder);
orderRouter.post("/paystack",       authUser,   placeOrderPaystack);

// User — verify payment
orderRouter.post("/verifyPaystack", authUser,   verifyPaystack);

// User — own orders
orderRouter.post("/userorders",     authUser,   userOrders);

// Admin — all orders + status update
orderRouter.post("/list",           adminAuth,  allOrders);
orderRouter.post("/status",         adminAuth,  updateStatus);

export default orderRouter;
