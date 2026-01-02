import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import Title from "../components/Title";
import Productitem from "./Productitem";

const LatestCollection = () => {
  // this is to get only the product from the Shopcontext, if other data is needed like currency, then it will be "const {products, currency}"
  const { products } = useContext(Shopcontext);

  const [latestProducts, setLatestProducts] = useState([]);
  //  useEffect is to allow side effect to take place, like mapping, fetch .....
  // slice is to cut in an array
  // the empty arry at the end is called dependancies that only allows the code to run once 


  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"ARIVALS"} />
        <p className="w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600">
          Speedtouch the best place you can find quality  materials & equipments.
        </p>
      </div>
      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
        {
          latestProducts.map((item,index)=>(
            <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
