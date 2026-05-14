import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsArrowRight, BsBag, BsShieldCheck } from 'react-icons/bs';
import { TbCurrencyNaira } from 'react-icons/tb';
import { MdOutlineLocalShipping } from 'react-icons/md';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, products, updateQuantitiy, navigate, token, setBuyNowItem } = useContext(Shopcontext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const item in cartItems) {
        if (cartItems[item]) {
          tempData.push({ id: item, amount: cartItems[item].amount });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 50%, #0d1b2a 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }} />
        <div className="absolute -top-10 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #159be3, transparent)' }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#f6e5b7]" />
            <span className="text-[#f6e5b7] text-xs font-bold uppercase tracking-[0.25em]">Review Your Order</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-5xl font-black text-white uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Your{' '}
              <span style={{ background: 'linear-gradient(90deg, #159be3, #f6e5b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Cart
              </span>
            </h1>
            {cartData.length > 0 && (
              <span className="bg-[#159be3] text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center">
                {cartData.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-3xl bg-[#159be3]/10 flex items-center justify-center mb-8">
              <BsBag className="w-12 h-12 text-[#159be3]/40" />
            </div>
            <h2 className="text-2xl font-black text-[#0d1b2a] uppercase mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>Your Cart is Empty</h2>
            <p className="text-gray-400 font-semibold text-sm mb-8 max-w-sm">
              Browse our cleaning supplies and add products to your cart
            </p>
            <Link
              to="/collection"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#159be3] to-[#0e7ab8] text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:shadow-xl hover:shadow-[#159be3]/30 transition-all group"
            >
              Browse Products
              <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Cart Items */}
            <div className="flex-1 min-w-0">
              {/* Header row */}
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 mb-4 pb-4 border-b border-gray-100">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Product</span>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest text-center w-28">Quantity</span>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest text-right w-20">Price</span>
              </div>

              <div className="space-y-0">
                {cartData.map((item, index) => {
                  const productData = products.find((p) => p._id === item.id);
                  if (!productData) return null;
                  return (
                    <div key={index} className="group flex items-center gap-4 sm:gap-6 py-6 border-b border-gray-100 hover:bg-[#f9feff] transition-colors rounded-2xl px-2">

                      {/* Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#f0f9ff] border border-[#159be3]/10 flex-shrink-0 overflow-hidden">
                        <img src={productData.image[0]} className="w-full h-full object-cover" alt={productData.name} />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-black text-[#0d1b2a] text-sm uppercase leading-tight truncate max-w-[180px] sm:max-w-xs" style={{ fontFamily: 'Oswald, sans-serif' }}>
                              {productData.name}
                            </h3>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-[#159be3]/10 text-[#159be3] text-[10px] font-bold uppercase rounded-lg capitalize">
                              {productData.category}
                            </span>
                          </div>
                          <span className="flex items-center text-[#159be3] font-black text-base sm:hidden flex-shrink-0" style={{ fontFamily: 'Oswald, sans-serif' }}>
                            <TbCurrencyNaira className="w-4 h-4" />
                            {(productData.price * item.amount).toLocaleString()}
                          </span>
                        </div>

                        {/* Quantity + delete */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center rounded-xl border-2 border-gray-100 overflow-hidden">
                            <button
                              onClick={() => item.amount > 1 && updateQuantitiy(item.id, item.amount - 1)}
                              className="px-3 py-2 text-gray-500 hover:text-[#159be3] hover:bg-[#f0f9ff] font-bold transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="px-4 py-2 text-[#0d1b2a] font-black text-sm border-x-2 border-gray-100 min-w-[40px] text-center">
                              {item.amount}
                            </span>
                            <button
                              onClick={() => updateQuantitiy(item.id, item.amount + 1)}
                              className="px-3 py-2 text-gray-500 hover:text-[#159be3] hover:bg-[#f0f9ff] font-bold transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => updateQuantitiy(item.id, 0)}
                            className="p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                            aria-label="Remove item"
                          >
                            <RiDeleteBin6Line className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Desktop price */}
                      <div className="hidden sm:flex flex-col items-end flex-shrink-0 w-24">
                        <span className="flex items-center text-[#159be3] font-black text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>
                          <TbCurrencyNaira className="w-4 h-4" />
                          {(productData.price * item.amount).toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-xs font-semibold mt-0.5">
                          {item.amount} × {productData.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue shopping */}
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 mt-6 text-[#159be3] font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all"
              >
                <BsArrowRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 flex-shrink-0">
              <CartTotal />
              <button
                onClick={() => {
                  if (!token) {
                    toast.error('Please log in to checkout');
                    navigate('/login');
                    return;
                  }
                  setBuyNowItem(null);
                  navigate('/place-order');
                }}
                className="w-full mt-4 flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-[#159be3] to-[#0e7ab8] text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:shadow-xl hover:shadow-[#159be3]/30 transition-all group"
              >
                Proceed to Checkout
                <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Trust items */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-[#f0f9ff] rounded-xl px-3 py-3 border border-[#159be3]/10">
                  <BsShieldCheck className="w-4 h-4 text-[#159be3] flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-500">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f0f9ff] rounded-xl px-3 py-3 border border-[#159be3]/10">
                  <MdOutlineLocalShipping className="w-4 h-4 text-[#159be3] flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-500">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
