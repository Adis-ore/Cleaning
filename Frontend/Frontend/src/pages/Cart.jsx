import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { cartItems, products, currency, updateQuantitiy, navigate } =
    useContext(Shopcontext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const item in cartItems) {
        if (cartItems[item]) {
          tempData.push({
            id: item,
            amount: cartItems[item].amount,
          });
        }
      }
      // setCartData(tempData);
      setCartData(tempData);
    }
  }, [cartItems, products]);
  // onChange={(e) => {
  //   const newValue = parseInt(e.target.value, 10);
  //   if (!isNaN(newValue) && newValue > 0) {
  //     updateQuantitiy(item.id, newValue);
  //   }
  // }}

  return (
    <div className="border-t-2 border-gray-200 mt-10 pt-14 ">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item.id
          );
          // console.log(item);

          return (
            <div
              key={index}
              className="py-4 border-t flex border-b text-gray-700 justify-between grid-cols-[4fr_0.5fr_fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex  items-start gap-6">
                <img
                  src={productData.image[0]}
                  className="w-16 sm:w-20"
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div>
                    <p className="flex items-center">
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>
              </div>
              {/* --------------------- quantity input ---------- */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === 0
                    ? null
                    : updateQuantitiy(item.id, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.amount}
              />
              {/* --------DELETE BUTTON---------- */}
              <RiDeleteBin6Line
                onClick={() => updateQuantitiy(item.id, 0)}
                className="text-[30px] cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
