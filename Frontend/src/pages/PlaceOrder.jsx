import React, { useContext, useState } from 'react';
import { BsArrowRight, BsCreditCard2Front, BsShieldCheck, BsLockFill } from 'react-icons/bs';
import { MdOutlineLocalShipping, MdPayment } from 'react-icons/md';
import { TbCurrencyNaira } from 'react-icons/tb';
import CartTotal from '../components/CartTotal';
import { Shopcontext } from '../context/Shopcontext';
import { toast } from 'react-toastify';

const inputClass =
  'w-full border-2 border-gray-100 bg-[#f9fafb] px-4 py-3.5 text-sm font-semibold text-[#0d1b2a] placeholder:text-gray-400 focus:outline-none focus:border-[#159be3] focus:bg-white transition-all rounded-2xl';

const PlaceOrder = () => {
  const [method, setMethod] = useState('paystack');
  const { navigate, cartItems, setCartItems, buyNowItem, setBuyNowItem } = useContext(Shopcontext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: 'Nigeria',
    phone: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    toast.success('Order placed successfully!');
    if (buyNowItem) {
      setBuyNowItem(null);
    } else {
      setCartItems({});
    }
    navigate('/order');
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 50%, #0d1b2a 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#f6e5b7]" />
            <span className="text-[#f6e5b7] text-xs font-bold uppercase tracking-[0.25em]">Final Step</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Place{' '}
            <span style={{ background: 'linear-gradient(90deg, #159be3, #f6e5b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Your Order
            </span>
          </h1>

          {/* Progress steps */}
          <div className="flex items-center gap-3 mt-6">
            {['Cart', 'Checkout', 'Confirmation'].map((step, i) => (
              <React.Fragment key={step}>
                <div className={`flex items-center gap-2 ${i <= 1 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    i === 0 ? 'bg-green-500 text-white' : i === 1 ? 'bg-[#159be3] text-white' : 'bg-white/20 text-white'
                  }`}>{i === 0 ? '✓' : i + 1}</div>
                  <span className="text-white/70 text-xs font-bold uppercase tracking-wider hidden sm:block">{step}</span>
                </div>
                {i < 2 && <div className={`h-[1px] w-8 sm:w-16 ${i === 0 ? 'bg-green-500' : 'bg-white/20'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <form onSubmit={onSubmit} className="flex flex-col lg:flex-row gap-12">

          {/* Left — Delivery + Payment */}
          <div className="flex-1 min-w-0">

            {/* Delivery Info */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="font-black text-[#0d1b2a] text-sm uppercase tracking-widest mb-6 flex items-center gap-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
                <div className="w-8 h-8 rounded-xl bg-[#159be3]/10 flex items-center justify-center">
                  <MdOutlineLocalShipping className="w-4 h-4 text-[#159be3]" />
                </div>
                Delivery Information
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#0d1b2a] text-[10px] font-black uppercase tracking-widest block mb-2">First Name</label>
                    <input type="text" name="firstName" placeholder="John" required onChange={onChange} value={formData.firstName} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[#0d1b2a] text-[10px] font-black uppercase tracking-widest block mb-2">Last Name</label>
                    <input type="text" name="lastName" placeholder="Doe" required onChange={onChange} value={formData.lastName} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-[#0d1b2a] text-[10px] font-black uppercase tracking-widest block mb-2">Email Address</label>
                  <input type="email" name="email" placeholder="you@example.com" required onChange={onChange} value={formData.email} className={inputClass} />
                </div>
                <div>
                  <label className="text-[#0d1b2a] text-[10px] font-black uppercase tracking-widest block mb-2">Phone Number</label>
                  <input type="tel" name="phone" placeholder="+234 000 000 0000" required onChange={onChange} value={formData.phone} className={inputClass} />
                </div>
                <div>
                  <label className="text-[#0d1b2a] text-[10px] font-black uppercase tracking-widest block mb-2">Street Address</label>
                  <input type="text" name="street" placeholder="No 7 Oluyoro Street" required onChange={onChange} value={formData.street} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#0d1b2a] text-[10px] font-black uppercase tracking-widest block mb-2">City</label>
                    <input type="text" name="city" placeholder="Ibadan" required onChange={onChange} value={formData.city} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[#0d1b2a] text-[10px] font-black uppercase tracking-widest block mb-2">State</label>
                    <input type="text" name="state" placeholder="Oyo State" required onChange={onChange} value={formData.state} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h2 className="font-black text-[#0d1b2a] text-sm uppercase tracking-widest mb-6 flex items-center gap-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
                <div className="w-8 h-8 rounded-xl bg-[#159be3]/10 flex items-center justify-center">
                  <MdPayment className="w-4 h-4 text-[#159be3]" />
                </div>
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* Paystack */}
                <div
                  onClick={() => setMethod('paystack')}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    method === 'paystack'
                      ? 'border-[#159be3] bg-[#f0f9ff] shadow-md shadow-[#159be3]/10'
                      : 'border-gray-100 hover:border-[#159be3]/30 bg-[#f9fafb]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${method === 'paystack' ? 'border-[#159be3]' : 'border-gray-300'}`}>
                    {method === 'paystack' && <div className="w-2.5 h-2.5 rounded-full bg-[#159be3]" />}
                  </div>
                  <div className="w-12 h-10 rounded-xl bg-[#159be3] flex items-center justify-center flex-shrink-0">
                    <BsCreditCard2Front className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-[#0d1b2a] text-sm">Paystack</p>
                    <p className="text-gray-400 text-xs font-semibold">Card, bank transfer & USSD payment</p>
                  </div>
                  <BsShieldCheck className="w-5 h-5 text-[#159be3] flex-shrink-0" />
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setMethod('cod')}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    method === 'cod'
                      ? 'border-[#159be3] bg-[#f0f9ff] shadow-md shadow-[#159be3]/10'
                      : 'border-gray-100 hover:border-[#159be3]/30 bg-[#f9fafb]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${method === 'cod' ? 'border-[#159be3]' : 'border-gray-300'}`}>
                    {method === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#159be3]" />}
                  </div>
                  <div className="w-12 h-10 rounded-xl bg-[#f0f9ff] border-2 border-[#159be3]/20 flex items-center justify-center flex-shrink-0">
                    <TbCurrencyNaira className="w-6 h-6 text-[#159be3]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-[#0d1b2a] text-sm">Cash on Delivery</p>
                    <p className="text-gray-400 text-xs font-semibold">Pay when your order arrives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-4">

              {/* Buy Now single-item card */}
              {buyNowItem && (
                <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
                  <div className="px-6 py-4" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%)' }}>
                    <h3 className="font-black text-white text-sm uppercase tracking-widest" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      Your Item
                    </h3>
                  </div>
                  <div className="bg-white p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#f0f9ff] border border-[#159be3]/10 overflow-hidden flex-shrink-0">
                        <img src={buyNowItem.image[0]} className="w-full h-full object-cover" alt={buyNowItem.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-[#0d1b2a] text-sm uppercase leading-tight truncate" style={{ fontFamily: 'Oswald, sans-serif' }}>
                          {buyNowItem.name}
                        </h4>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-[#159be3]/10 text-[#159be3] text-[10px] font-bold uppercase rounded-lg capitalize">
                          {buyNowItem.category}
                        </span>
                        <p className="text-gray-400 text-xs font-semibold mt-1">Qty: 1</p>
                      </div>
                      <span className="flex items-center text-[#159be3] font-black text-base flex-shrink-0" style={{ fontFamily: 'Oswald, sans-serif' }}>
                        <TbCurrencyNaira className="w-4 h-4" />
                        {buyNowItem.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <CartTotal />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#159be3] to-[#0e7ab8] text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:shadow-xl hover:shadow-[#159be3]/30 transition-all duration-300 group"
              >
                <BsLockFill className="w-4 h-4" />
                Confirm Order
                <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <BsShieldCheck className="w-4 h-4 text-[#159be3]" />
                <span className="text-xs font-semibold">256-bit SSL encrypted checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
