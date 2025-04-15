import userModel from "../models/userModel.js";

// product to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      cartData[itemId]["amount"] += 1;
    } else {
      cartData[itemId] = { amount: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// update user cart
// const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, amount } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = await userData.cartData;

//     cartData[itemId]["amount"] = amount;
//     await userModel.findByIdAndUpdate(userId, { cartData });
//     res.json({ success: true, message: "Cart updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
const updateCart = async (req, res) => {
    try {
      const { userId, itemId, amount } = req.body;
  
      const userData = await userModel.findById(userId);
      let cartData = userData.cartData || {};
  
      if (amount === 0) {
        delete cartData[itemId]; // Delete item if amount is 0
      } else {
        cartData[itemId] = { amount }; // Set the new amount
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Cart updated" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  


// get   user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
