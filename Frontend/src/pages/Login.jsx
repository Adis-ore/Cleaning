import React, { useContext, useState, useEffect } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { toast } from 'react-toastify';
import { BsArrowRight, BsEye, BsEyeSlash, BsShieldCheck } from 'react-icons/bs';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { RiLeafLine } from 'react-icons/ri';
import { BiTrophy } from 'react-icons/bi';
import { assets } from '../assets/assets';

const highlights = [
  { icon: MdOutlineCleaningServices, text: 'Book services instantly' },
  { icon: RiLeafLine, text: 'Track your orders & history' },
  { icon: BiTrophy, text: 'Access exclusive member deals' },
  { icon: BsShieldCheck, text: 'Secured & private account' },
];

const Login = () => {
  const [mode, setMode] = useState('login');
  const { token, setToken, navigate } = useContext(Shopcontext);
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  const onSubmit = (e) => {
    e.preventDefault();
    const fakeToken = 'demo-token-' + Date.now();
    setToken(fakeToken);
    localStorage.setItem('token', fakeToken);
    toast.success(mode === 'login' ? 'Welcome back!' : 'Account created successfully!');
  };

  return (
    <div className="min-h-screen flex">

      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 60%, #0d1b2a 100%)' }}>

        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #159be3, transparent)', opacity: 0.15 }} />
        <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #f6e5b7, transparent)' }} />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }} />

        <div className="relative z-10 p-12">
          <img src={assets.speedtouch} alt="Speed Touch" className="h-10 w-auto mb-16" />

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-[#159be3]" />
              <span className="text-[#f6e5b7] text-xs font-bold uppercase tracking-widest">Member Portal</span>
            </div>
            <h1 className="text-5xl xl:text-6xl font-black text-white uppercase leading-tight mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Your Clean Space<br />
              <span style={{ background: 'linear-gradient(90deg, #159be3, #f6e5b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Starts Here
              </span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Join thousands of homes and businesses that trust Speed Touch for professional cleaning and hygiene services.
            </p>
          </div>

          <div className="space-y-4">
            {highlights.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                <div className="w-10 h-10 rounded-xl bg-[#159be3]/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#159be3]" />
                </div>
                <span className="text-white/80 text-sm font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="relative z-10 p-12 pt-0">
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: '500+', label: 'Happy Clients' },
              { val: '6+', label: 'Years Active' },
              { val: '8', label: 'Services' },
            ].map(({ val, label }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-[#159be3]" style={{ fontFamily: 'Oswald, sans-serif' }}>{val}</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <img src={assets.speedtouch} alt="Speed Touch" className="h-8 w-auto mb-10 lg:hidden" />

          {/* Mode tabs */}
          <div className="flex bg-[#f0f9ff] rounded-2xl p-1 mb-8">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                  mode === m
                    ? 'bg-[#159be3] text-white shadow-lg shadow-[#159be3]/30'
                    : 'text-gray-400 hover:text-[#159be3]'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#0d1b2a] uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-semibold">
              {mode === 'login' ? 'Sign in to manage your bookings and orders' : 'Join Speed Touch and experience premium cleaning'}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="text-[#0d1b2a] text-xs font-bold uppercase tracking-widest block mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-[#f9fafb] text-[#0d1b2a] font-semibold text-sm placeholder:text-gray-400 outline-none focus:border-[#159be3] focus:bg-white transition-all"
                />
              </div>
            )}

            <div>
              <label className="text-[#0d1b2a] text-xs font-bold uppercase tracking-widest block mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-[#f9fafb] text-[#0d1b2a] font-semibold text-sm placeholder:text-gray-400 outline-none focus:border-[#159be3] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="text-[#0d1b2a] text-xs font-bold uppercase tracking-widest block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3.5 pr-12 rounded-2xl border-2 border-gray-100 bg-[#f9fafb] text-[#0d1b2a] font-semibold text-sm placeholder:text-gray-400 outline-none focus:border-[#159be3] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#159be3] transition-colors"
                >
                  {showPass ? <BsEyeSlash className="w-4 h-4" /> : <BsEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-[#159be3] text-xs font-bold uppercase tracking-wider hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#159be3] to-[#0e7ab8] text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:shadow-xl hover:shadow-[#159be3]/30 transition-all duration-300 group mt-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm font-semibold mt-8">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#159be3] font-bold hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>

          <div className="flex items-center justify-center gap-2 mt-6 text-gray-300">
            <BsShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold">Protected by SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
