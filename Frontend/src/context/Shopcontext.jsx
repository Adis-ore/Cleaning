import { TbCurrencyNaira } from "react-icons/tb";
// const { createContext } = require("react");
import { createContext } from "react";
// import { products } from "../assets/assets";
import { useState } from "react"; // Removed unused `useEffect`
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {
  const currency = <TbCurrencyNaira />;
  const delivery_fee = 1500;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  // ------------- TO  NAVIGATE--------------
  const navigate = useNavigate();

  //  ------------- ADD TO CART ----------------
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems); // Ensure compatibility if needed
    if (cartData[itemId]) {
      cartData[itemId]["amount"] += 1;
    } else {
      cartData[itemId] = { amount: 1 };
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
        toast.success("Item added to cart");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item].amount;
      // console.log(typeof totalCount);
    }

    return totalCount;
  };

  //  --------------- TO DELETE AND UPDATE THE CART-----------------
  const updateQuantitiy = async (itemId, amount) => {
    let cartData = structuredClone(cartItems); // Ensure compatibility if needed
    if (amount === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId]["amount"] = Number(amount);
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, amount },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  //  --------------TO GET TO AMOUNT-----------------
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product && cartItems[itemId].amount > 0) {
        totalAmount += product.price * cartItems[itemId].amount;
      }
    }
    return totalAmount;
  };
  //  ------------ To get data from back end -----------------------
  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // ---- to avoid the cart to clear after reload -----

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  //  ----- this is to prevent the page to log you out after refreshing -----------
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

  const value = {
    products,
    currency,
    getCartAmount, // Removed undefined `totalAmount`
    updateQuantitiy,
    delivery_fee,
    addToCart,
    setCartItems,
    cartItems,
    getCartCount,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <Shopcontext.Provider value={value}>{props.children}</Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
