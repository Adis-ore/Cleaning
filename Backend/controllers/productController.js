import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// POST /api/product/add  (admin)
const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, bestseller, subCategory } = req.body;

    if (!name || !price || !description || !category || !subCategory) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const imageFiles = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    if (imageFiles.length === 0) {
      return res.status(400).json({ success: false, message: "At least one product image is required." });
    }

    const imageUrls = await Promise.all(
      imageFiles.map((file) =>
        cloudinary.uploader
          .upload(file.path, { resource_type: "image", folder: "speedtouch/products" })
          .then((r) => r.secure_url)
      )
    );

    const product = new productModel({
      name,
      price:       Number(price),
      description,
      category,
      subCategory,
      bestseller:  bestseller === "true" || bestseller === true,
      image:       imageUrls,
      date:        Date.now(),
    });

    await product.save();
    res.status(201).json({ success: true, message: "Product added successfully." });
  } catch (error) {
    console.error("addProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/product/list  (public)
const listProduct = async (_req, res) => {
  try {
    const products = await productModel.find({}).sort({ date: -1 });
    res.json({ success: true, products });
  } catch (error) {
    console.error("listProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/product/remove  (admin)
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.json({ success: true, message: "Product removed successfully." });
  } catch (error) {
    console.error("removeProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/product/single?id=xxx  (public)
const singleProduct = async (req, res) => {
  try {
    const id = req.query.id || req.body.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("singleProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/product/update  (admin)
const updateProduct = async (req, res) => {
  try {
    const { id, name, price, description, category, subCategory, bestseller } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }

    const updates = {};
    if (name        !== undefined) updates.name        = name;
    if (price       !== undefined) updates.price       = Number(price);
    if (description !== undefined) updates.description = description;
    if (category    !== undefined) updates.category    = category;
    if (subCategory !== undefined) updates.subCategory = subCategory;
    if (bestseller  !== undefined) updates.bestseller  = bestseller === "true" || bestseller === true;

    const product = await productModel.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.json({ success: true, message: "Product updated.", product });
  } catch (error) {
    console.error("updateProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
