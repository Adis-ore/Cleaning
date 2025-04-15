import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Add error handling for file uploads
productRouter.post(
  "/add",
  adminAuth,
  (req, res, next) => {
    upload.fields([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
    ])(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  addProduct
);
productRouter.get("/list", listProduct);

// Update `/remove` route to use DELETE for consistency
productRouter.delete("/remove", adminAuth, removeProduct);

productRouter.get("/single", singleProduct);

export default productRouter;
