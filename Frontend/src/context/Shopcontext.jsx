import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TbCurrencyNaira } from "react-icons/tb";

export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {
  const currency = <TbCurrencyNaira />;
  const delivery_fee = 1500;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [buyNowItem, setBuyNowItem] = useState(null);

  const navigate = useNavigate();

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updated = structuredClone(prev);
      if (updated[itemId]) {
        updated[itemId].amount += 1;
      } else {
        updated[itemId] = { amount: 1 };
      }
      return updated;
    });
    toast.success("Item added to cart");
  };

  const getCartCount = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item].amount;
    }
    return total;
  };

  const updateQuantitiy = (itemId, amount) => {
    setCartItems((prev) => {
      const updated = structuredClone(prev);
      if (amount === 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = { amount };
      }
      return updated;
    });
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product && cartItems[itemId].amount > 0) {
        total += product.price * cartItems[itemId].amount;
      }
    }
    return total;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const value = {
    products,
    currency,
    delivery_fee,
    addToCart,
    getCartCount,
    updateQuantitiy,
    getCartAmount,
    cartItems,
    setCartItems,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
    token,
    setToken,
    logOut,
    buyNowItem,
    setBuyNowItem,
    backendUrl: "",
  };

  return (
    <Shopcontext.Provider value={value}>
      {props.children}
    </Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
