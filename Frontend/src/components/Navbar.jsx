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
    // the navbar body/ container with gradient background
    <div className="flex items-center justify-between py-6 px-8 font-medium bg-gradient-to-r from-[#1E6DFF] via-[#3D7FFF] to-[#1E6DFF] shadow-lg">
      {/* logo */}
      <Link to="/" className="transform hover:scale-105 transition-transform">
        <img src={assets.speedtouch} className="w-36 max-sm:w-20 drop-shadow-lg" alt="" />
      </Link>
      {/* containing the home and links */}
      <ul className="hidden sm:flex gap-8 text-sm font-semibold">
        <NavLink to="/" className="flex flex-col items-center gap-1 text-white hover:text-[#E6CB7A] transition-all">
          <p className="tracking-wide">HOME</p>
          {/* this hr is for the underline */}
          <hr className="w-2/4 border-none h-[2px] bg-[#E6CB7A] hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1 text-white hover:text-[#E6CB7A] transition-all">
          <p className="tracking-wide">PRODUCTS</p>
          <hr className="w-2/4 border-none h-[2px] bg-[#E6CB7A] hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 text-white hover:text-[#E6CB7A] transition-all">
          <p className="tracking-wide">ABOUT</p>
          <hr className="w-2/4 border-none h-[2px] bg-[#E6CB7A] hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 text-white hover:text-[#E6CB7A] transition-all">
          <p className="tracking-wide">CONTACT</p>
          <hr className="w-2/4 border-none h-[2px] bg-[#E6CB7A] hidden" />
        </NavLink>
      </ul>
      {/*------------------ containing the search and profile icon------------------  */}
      <div className="flex items-center gap-6">
        <FiSearch
          onClick={() => setShowSearch(true)}
          className="cursor-pointer text-[25px] text-white hover:text-[#E6CB7A] hover:scale-110 transition-all"
        />
        {/*------------------ the profile icon ------------------*/}
        <div className="group relative">
          <CgProfile 
            onClick={()=> token ? null : navigate('/login')} 
            className="w-5 cursor-pointer text-[25px] text-white hover:text-[#E6CB7A] hover:scale-110 transition-all"  
          />
          {
            token &&
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
              <div className="flex flex-col gap-1 w-40 py-3 px-4 bg-white border-2 border-[#E6CB7A] text-[#1E6DFF] rounded-xl shadow-2xl">
                <p className="cursor-pointer hover:text-white hover:bg-[#1E6DFF] px-3 py-2 rounded-lg transition-all font-medium">My profile</p>
                <p onClick={()=> navigate('/order')} className="cursor-pointer hover:text-white hover:bg-[#1E6DFF] px-3 py-2 rounded-lg transition-all font-medium">Orders</p>
                <p onClick={logOut} className="cursor-pointer hover:text-white hover:bg-[#1E6DFF] px-3 py-2 rounded-lg transition-all font-medium">Logout</p>
              </div>
            </div>
          }
        </div>
        <Link to="/cart" className="relative transform hover:scale-110 transition-transform">
          <p className="text-[10px] absolute right-[-11px] top-[-8px] w-5 text-center flex items-center justify-center leading-4 bg-[#E6CB7A] text-[#1E6DFF] aspect-square rounded-full font-bold shadow-md">
            {getCartCount()}
          </p>
          <AiOutlineShoppingCart className="text-[28px] text-white hover:text-[#E6CB7A] transition-colors" />
        </Link>
        <AiOutlineMenu
          onClick={() => setVisible(true)}
          className="cursor-pointer sm:hidden text-white text-[28px] hover:text-[#E6CB7A] transition-colors"
        />
      </div>
      {/* --------------- side bar menu for small screen -------------------- */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-gradient-to-b from-[#1E6DFF] to-[#1557CC] transition-all z-20 shadow-2xl ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer bg-[#1557CC] hover:bg-[#0D4599] transition-colors border-b border-[#E6CB7A]/30"
          >
            {/*-------------------- the back function --------------------------- */}
            <IoIosArrowForward className="h-5 rotate-180 text-white" />
            <p className="font-semibold text-white text-lg">Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-8 border-b border-[#E6CB7A]/30 hover:bg-[#1557CC] hover:border-l-4 hover:border-l-[#E6CB7A] text-white transition-all font-medium text-lg tracking-wide"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-8 border-b border-[#E6CB7A]/30 hover:bg-[#1557CC] hover:border-l-4 hover:border-l-[#E6CB7A] text-white transition-all font-medium text-lg tracking-wide"
            to="/collection"
          >
            PRODUCTS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-8 border-b border-[#E6CB7A]/30 hover:bg-[#1557CC] hover:border-l-4 hover:border-l-[#E6CB7A] text-white transition-all font-medium text-lg tracking-wide"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-8 border-b border-[#E6CB7A]/30 hover:bg-[#1557CC] hover:border-l-4 hover:border-l-[#E6CB7A] text-white transition-all font-medium text-lg tracking-wide"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;