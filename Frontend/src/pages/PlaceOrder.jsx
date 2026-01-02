import { RiFlutterFill } from "react-icons/ri";
import { FaStripe } from "react-icons/fa";
import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { Shopcontext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(Shopcontext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));

    // console.log(formData);

    // setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.amount = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // Api Calls for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            // localStorage.removeItem("cartItems");
            navigate("/order");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":

          const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          } else{
            toast.error(responseStripe.data.message)
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(response.error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ----------------- LEFT SIDE ---------------- */}
      <div className="flex flex-col w-full gap-4 sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            required
            className="border border-gray-300 rounded py-1.5 w-full "
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            className="border border-gray-300 rounded py-1.5 w-full "
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 w-full "
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
        />
        {/* <input
          type="text"
          placeholder="Business Name"
          className="border border-gray-300 rounded py-1.5 w-full "
          
        /> */}
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 w-full "
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            required
            className="border border-gray-300 rounded py-1.5 w-full "
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
          />
          <input
            type="text"
            placeholder="State"
            required
            className="border border-gray-300 rounded py-1.5 w-full "
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            required
            className="border border-gray-300 rounded py-1.5 w-full "
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
          />
          <input
            type="text"
            placeholder="Country"
            required
            className="border border-gray-300 rounded py-1.5 w-full "
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          required
          className="border border-gray-300 rounded py-1.5 w-full "
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
        />
      </div>
      {/* ----------RIGHT SIDE------------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* --------- PAYMENT METHOD SELECTION --------- */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center cursor-pointer gap-3 border p-2 px-3"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <FaStripe className="w-[40px] h-[40px] text-blue-800" />
            </div>
            {/* <div
              onClick={() => setMethod("razorblade")}
              className="flex items-center cursor-pointer gap-3 border p-2 px-3"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorblade" ? "bg-green-400" : ""
                }`}
              ></p>
              <RiFlutterFill className="w-[40px] h-[40px] text-blue-800" />
            </div> */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center cursor-pointer gap-3 border p-2 px-3"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              // onClick={() => navigate("/order")}
              type="submit"
              className="bg-black px-16 py-3 text-sm cursor-pointer text-white"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
