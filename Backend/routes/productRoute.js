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

// Log when router loads
console.log("PRODUCT ROUTER LOADED");

// Add Product (with file upload)
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
      if (err) return res.status(400).json({ success: false, message: err.message });
      next();
    });
  },
  addProduct
);

// List Products
productRouter.get("/list", (req, res) => {
  console.log("GET /list called");
  listProduct(req, res);
});

// Delete Product
productRouter.delete("/remove", adminAuth, removeProduct);

// Single Product Info
productRouter.get("/single", singleProduct);

export default productRouter;
