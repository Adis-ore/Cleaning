import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/ordersRoutes.js";

// App configuration
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

const allowedOrigins = ["https://speedtouch-admin.vercel.app", "https://speedtouch.vercel.app", "http://localhost:5174  "];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => console.log("server is running on port :" + port));
