import React, { useContext } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { TbCurrencyNaira } from 'react-icons/tb';
import { BsShieldCheck, BsTruck } from 'react-icons/bs';
import { MdOutlineLocalOffer } from 'react-icons/md';

const CartTotal = () => {
  const { getCartAmount, delivery_fee, buyNowItem } = useContext(Shopcontext);
  const subtotal = buyNowItem
    ? buyNowItem.price * buyNowItem.amount
    : getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d1b2a] to-[#1a3a5c] px-6 py-5">
        <h3 className="font-black text-white text-base uppercase tracking-widest" style={{ fontFamily: 'Oswald, sans-serif' }}>
          Order Summary
        </h3>
        <p className="text-white/40 text-xs font-semibold mt-1">Review your order before checkout</p>
      </div>

      <div className="bg-white p-6">
        {/* Line items */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-semibold">Subtotal</span>
            <span className="flex items-center gap-0.5 text-[#0d1b2a] font-black">
              <TbCurrencyNaira className="w-4 h-4" />
              {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-semibold flex items-center gap-1.5">
              <BsTruck className="w-4 h-4 text-[#159be3]" />
              Delivery Fee
            </span>
            <span className="flex items-center gap-0.5 text-[#0d1b2a] font-black">
              <TbCurrencyNaira className="w-4 h-4" />
              {delivery_fee.toLocaleString()}
            </span>
          </div>

          {/* Promo placeholder */}
          <div className="flex items-center gap-2 bg-[#f0fdf4] border border-green-200 rounded-xl px-3 py-2">
            <MdOutlineLocalOffer className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="text-green-700 text-xs font-semibold">No promo code applied</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[#0d1b2a] font-black text-base uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>Total</span>
          <div className="text-right">
            <span className="flex items-center gap-0.5 text-[#159be3] font-black text-2xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
              <TbCurrencyNaira className="w-6 h-6" />
              {total.toLocaleString()}
            </span>
            <span className="text-gray-400 text-[10px] font-semibold block">VAT inclusive</span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-400">
            <BsShieldCheck className="w-4 h-4 text-[#159be3]" />
            <span className="text-xs font-semibold">Secure</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-gray-400">
            <BsTruck className="w-4 h-4 text-[#159be3]" />
            <span className="text-xs font-semibold">Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
