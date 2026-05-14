import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  bestsellers: { type: Boolean, default: false },
  application: { type: Array, default: [] },
  date: { type: Number, default: Date.now },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;