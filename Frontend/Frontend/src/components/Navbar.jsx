import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { Shopcontext } from "../context/Shopcontext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(Shopcontext);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logOut = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
              <img 
                src={assets.speedtouch} 
                className="h-10 w-auto sm:h-12" 
                alt="Speedtouch Logo" 
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/collection" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
              >
                Contact
              </NavLink>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Search Button */}
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => token ? null : navigate('/login')}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  aria-label="Profile"
                >
                  <CgProfile className="w-5 h-5" />
                </button>
                
                {token && (
                  <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                      <button
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => navigate('/order')}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                      >
                        Orders
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={logOut}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <Link 
                to="/cart" 
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                aria-label="Shopping Cart"
              >
                <AiOutlineShoppingCart className="w-6 h-6" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setVisible(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                aria-label="Menu"
              >
                <AiOutlineMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20 sm:h-24"></div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setVisible(false)}
        ></div>
        
        {/* Sidebar Panel */}
        <div className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => setVisible(false)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              aria-label="Close menu"
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>
          </div>

          {/* User Info (if logged in) */}
          {token && (
            <div className="p-4 bg-blue-50 border-b border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <CgProfile className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                  <p className="text-xs text-gray-600">Manage your account</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            <NavLink
              to="/"
              onClick={() => setVisible(false)}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              onClick={() => setVisible(false)}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setVisible(false)}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setVisible(false)}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Account Actions (if logged in) */}
          {token && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50 space-y-2">
              <button
                onClick={() => {
                  navigate('/order');
                  setVisible(false);
                }}
                className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border border-gray-200"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  logOut();
                  setVisible(false);
                }}
                className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 bg-white rounded-lg hover:bg-red-50 transition-all duration-200 border border-red-200"
              >
                Logout
              </button>
            </div>
          )}

          {/* Login Button (if not logged in) */}
          {!token && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  navigate('/login');
                  setVisible(false);
                }}
                className="w-full px-4 py-3 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
              >
                Sign In / Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;