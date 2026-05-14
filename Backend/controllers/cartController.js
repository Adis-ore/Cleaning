import userModel from "../models/userModel.js";

// POST /api/cart/add
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    const cartData = user.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId].amount += 1;
    } else {
      cartData[itemId] = { amount: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart." });
  } catch (error) {
    console.error("addToCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/cart/update
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, amount } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    const cartData = user.cartData || {};

    if (amount <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = { amount };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated." });
  } catch (error) {
    console.error("updateCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/cart/get
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error("getUserCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
