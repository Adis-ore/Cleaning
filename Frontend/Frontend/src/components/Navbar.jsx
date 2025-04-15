import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { Shopcontext } from "../context/Shopcontext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(Shopcontext);
  useEffect(() => {
    // console.log(getCartCount());
  }, [getCartCount]);

  const logOut = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  return (
    // the navbar body/ container
    <div className="flex items-center justify-between py-5 font-medium ">
      {/* logo */}
      <Link to="/">
        <img src={assets.speedtouch} className="w-36 max-sm:w-20" alt="" />
      </Link>
      {/* containing the home and likes */}
      <ul className=" hidden sm:flex gap-5 text-sm  text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          {/* this hr is for the underline */}
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>PRODUCTS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      {/*------------------ containing the search and profile icon------------------  */}
      <div className="flex items-center gap-4">
        <FiSearch
          onClick={() => setShowSearch(true)}
          className="cursor-pointer text-[25px]"
        />
        {/*------------------ the profile icon ------------------*/}
        <div className="group relative">
          <CgProfile onClick={()=> token ? null : navigate('/login ') } className="w-5 cursor-pointer text-[25px]"  />
          {
            token &&
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className=" flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My profile</p>
              <p onClick={()=> navigate('/order')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logOut} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
          }
        </div>
        <Link to="/cart" className="relative">
          <p className="text-[10px] absolute right-[-11px] w-5 text-center flex items-center  justify-center leading-4 bg-black text-white aspect-square rounded-full ">
            {getCartCount()}
          </p>
          <AiOutlineShoppingCart className="text-[25px]" />
        </Link>
        <AiOutlineMenu
          onClick={() => setVisible(true)}
          className="cursor-pointer sm:hidden"
        />
      </div>
      {/* --------------- side bar menu for small screen -------------------- */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className=" flex flex-col text-gray-500">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            {/*-------------------- the back function --------------------------- */}
            <IoIosArrowForward className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            PRODUCTS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};
<BiSearch />;
export default Navbar;
