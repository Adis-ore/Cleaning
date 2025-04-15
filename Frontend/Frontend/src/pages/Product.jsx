import { AiFillStar } from "react-icons/ai";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Shopcontext } from "../context/Shopcontext";
import { useEffect } from "react";
import RelatedProduct from "../components/RelatedProduct";
import { TbReceiptYuan } from "react-icons/tb";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(Shopcontext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
 
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);

        setImage(item.image[0]);
        // console.log(item);   

        return null;
      }
    });
  };
  

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-0 pt-0 transition-opacity ease-in duration-500 opacity-100">
      {/* -------Product Data -------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* --------- Product images -------- */}
        <div className="flex sm:flex-col overflow-x-auto overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
          {productData.image.map((item, index) => (
            <img
              onClick={() => setImage(item)}
              src={item}
              key={index}
              className="w-[24%] sm:w-[60%] sm:mb-3 flex-shrink cursor-pointer"
              alt=""
            />
          ))}
        </div>
        <div className="w-full sm:w-[40%]">
          <img src={image} className="w-full h-auto" alt="" />
        </div>
        {/* ------------- Product information ----------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 ">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <AiFillStar className="" />
            <AiFillStar className="" />
            <AiFillStar className="" />
            <AiFillStar className="" />
            <AiFillStar className="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 flex items-center  text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <hr className="my-3 sm:w-4/5" />
          {/* --------------------Add to cart ---------------- */}
          <button onClick={()=>addToCart(productData._id)} className="bg-black text-white mt-5 px-8 py-3 cursor-pointer text-sm active:bg-gray-700 ">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 ">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* --------- Description & review -------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An e-commerce is a website that Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias recusandae, labore perferendis dolorum assumenda et id consequatur architecto suscipit eaque nemo ducimus distinctio voluptatibus sunt provident eius autem ea. Deserunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, deleniti soluta aut facilis aliquam accusamus ab ducimus temporibus veritatis voluptate obcaecati quam tempore, tenetur ratione quidem? Qui impedit fugit modi.</p>
        </div>
      </div>
      {/* ---------- diaplay related product --------- */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : 
    <div className="opacity-0"></div>
  ;
};

export default Product;
