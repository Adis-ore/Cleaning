import React, { useContext } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { Link } from "react-router-dom";

const Productitem = ({ id, name, price, image }) => {
  const { currency } = useContext(Shopcontext);
  return (
    <Link
      className="text-gray-700 cursor-pointer border h-[250px] w-[200px] overflow-hidden relative "
      to={`/product/${id}`}
    >
      {/* <div className="overflow-hidden"> */}
      <img
        className="hover:scale-110 transition ease-in-out w-full h-full"
        src={image[0]}
        alt=""
      />
      {/* </div> */}
      <div className="absolute bottom-0 bg-white rounded-t-md w-full p-2 border-t">
        <p className="pt-3 pb-1 text-sm ">{name}</p>
        <p className="text-sm flex items-center font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default Productitem;
