import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload    from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Public
productRouter.get("/list",   listProduct);
productRouter.get("/single", singleProduct);

// Admin — add with image upload
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

// Admin — remove & update
productRouter.delete("/remove", adminAuth, removeProduct);
productRouter.patch("/update",  adminAuth, updateProduct);

export default productRouter;
