import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/ordersRoutes.js";
import reviewRouter from "./routes/reviewRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "https://speedtouch-admin.vercel.app",
  "https://speedtouch.vercel.app",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: true, // temporarily allow all origins for debugging
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRouter);

// Root test route
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log("Server running on port:", port));
