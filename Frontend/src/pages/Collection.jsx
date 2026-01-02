import { AiOutlineShoppingCart } from "react-icons/ai"; 
import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { IoIosArrowForward } from "react-icons/io";
import Title from "../components/Title";
import Productitem from "../components/Productitem";

const Collection = () => {
  const { products, search, showSearch, addToCart } = useContext(Shopcontext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Filter by subcategory
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory)
      ); // fixed 'subCategory'
    }

    setFilterProduct(productsCopy);
  };

  // this is for the sort
  const sortProduct = () => {
    let fpCopy = filterProduct.slice();

    switch (sortType) {
      case "low-high":
        setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch,products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter option */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2  "
        >
          FILTER
          <IoIosArrowForward
            className={` rotate-90  sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* -------------- category filter -----------------*/}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium ">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"laundry"}
                onChange={toggleCategory}
              />{" "}
              Laundry
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"cleaning"}
                onChange={toggleCategory}
              />{" "}
              Cleaning
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"machines"}
                onChange={toggleCategory}
              />{" "}
              Machines
            </p>
          </div>
        </div>
        {/* Sub category */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium ">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Laundry Supplies"}
                onChange={toggleSubcategory}
              />
              Laundry Supplies
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Cleaning Agents"}
                onChange={toggleSubcategory}
              />
              Cleaning Agents
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Tools & Equipment"}
                onChange={toggleSubcategory}
              />
              Tools & Equipment
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"PRODUCTS"} />
          {/* product sort */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSortType(e.target.value)}
            name=""
            id=""
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProduct.map((items, index) => (
            <div className="flex flex-col items-center" key={index}>
              <Productitem
                key={index}
                name={items.name}
                id={items._id}
                image={items.image}
                price={items.price}
              />
              <button onClick={()=>addToCart(items._id)} className="bg-black text-white w-[100px] p-4 flex items-center justify-center py-2 mt-3 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out">
                <AiOutlineShoppingCart /> 
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
