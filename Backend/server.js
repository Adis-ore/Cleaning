import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter    from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter    from "./routes/cartRoutes.js";
import orderRouter   from "./routes/ordersRoutes.js";
import reviewRouter  from "./routes/reviewRoute.js";

const app  = express();
const port = process.env.PORT || 4000;

// DB + Cloudinary
connectDB();
connectCloudinary();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — allow frontend & admin origins
const allowedOrigins = [
  "http://localhost:5173",  // Admin dev
  "http://localhost:5174",  // Frontend dev
  "http://localhost:5175",
  "https://speedtouch-admin.vercel.app",
  "https://speedtouch.vercel.app",
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
}));

// Routes
app.use("/api/user",    userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart",    cartRouter);
app.use("/api/order",   orderRouter);
app.use("/api/review",  reviewRouter);

// Health check
app.get("/", (_req, res) => res.json({ success: true, message: "Speed Touch API running" }));

// 404 handler
app.use((_req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message || "Internal server error" });
});

app.listen(port, () => console.log(`Speed Touch API running on port ${port}`));
