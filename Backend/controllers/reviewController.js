import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";

// POST /api/review/add  — requires auth token
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment, userId } = req.body;

    if (!productId || !rating || !comment) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Prevent duplicate review on same product by same user
    const existing = await reviewModel.findOne({ productId, userId });
    if (existing) {
      return res.json({ success: false, message: "You have already reviewed this product" });
    }

    const review = new reviewModel({
      productId,
      userId,
      name: user.name,
      rating: Number(rating),
      comment,
    });

    await review.save();
    res.json({ success: true, message: "Review submitted", review });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// GET /api/review/:productId  — public
const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewModel
      .find({ productId })
      .sort({ date: -1 });

    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    res.json({ success: true, reviews, avgRating: Number(avgRating), count: reviews.length });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addReview, getReviews };
