import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsCart3, BsPerson, BsSearch, BsX, BsBoxArrowRight, BsClockHistory } from "react-icons/bs";
import { MdOutlineCleaningServices } from "react-icons/md";
import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { Shopcontext } from "../context/Shopcontext";

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/collection', label: 'Shop' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(Shopcontext);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setProfileOpen(false);
    navigate('/login');
  };

  const cartCount = getCartCount();

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: '#ffffff',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.06)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between" style={{ height: '68px' }}>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5">
            <img src={assets.speedtouch} alt="Speed Touch" className="h-8 w-auto object-contain" />
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                style={{ fontFamily: 'Poppins, sans-serif' }}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? ''
                      : ''
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? '#159be3' : 'rgba(13,27,42,0.5)',
                  background: isActive ? 'rgba(21,155,227,0.08)' : 'transparent',
                })}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: '#159be3' }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">

            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2.5 rounded-xl transition-all"
              style={{ color: 'rgba(13,27,42,0.45)' }}
            >
              <BsSearch className="w-[16px] h-[16px]" />
            </button>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => token ? setProfileOpen((v) => !v) : navigate('/login')}
                className="p-2.5 rounded-xl transition-all"
                style={{ color: 'rgba(13,27,42,0.45)' }}
              >
                <BsPerson className="w-[16px] h-[16px]" />
              </button>
              {token && profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 z-50" style={{ animation: 'fadeUp 0.2s ease both' }}>
                  <div className="rounded-2xl overflow-hidden" style={{ background: '#0d1b2a', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
                    <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: 'Poppins, sans-serif' }}>My Account</p>
                    </div>
                    <div className="p-2">
                      <button onClick={() => { navigate('/order'); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-white/8 group">
                        <BsClockHistory className="w-4 h-4 text-white/40 group-hover:text-[#159be3] transition-colors flex-shrink-0" />
                        <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>My Orders</span>
                      </button>
                      <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-red-500/10 group mt-1">
                        <BsBoxArrowRight className="w-4 h-4 text-red-400/60 group-hover:text-red-400 transition-colors flex-shrink-0" />
                        <span className="text-sm font-medium text-red-400/70 group-hover:text-red-400 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center p-2.5 rounded-xl transition-all"
              style={{ color: 'rgba(13,27,42,0.45)' }}
            >
              <BsCart3 className="w-[16px] h-[16px]" />
              {cartCount > 0 && (
                <span
                  className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                  style={{ background: '#159be3' }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Sign In — desktop CTA */}
            {!token && (
              <Link
                to="/login"
                className="hidden lg:flex items-center gap-2 ml-3 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                style={{ background: 'linear-gradient(135deg, #159be3, #0e7ab8)', color: '#ffffff', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 16px rgba(21,155,227,0.3)' }}
              >
                Sign In
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2.5 rounded-xl transition-all ml-1"
              style={{ color: 'rgba(13,27,42,0.55)' }}
            >
              <HiOutlineMenuAlt3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[99] lg:hidden"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className="fixed inset-y-0 right-0 z-[100] w-72 lg:hidden transition-transform duration-300 flex flex-col"
        style={{
          background: '#0d1b2a',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '-16px 0 60px rgba(0,0,0,0.5)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #159be3, #0e7ab8)' }}>
              <MdOutlineCleaningServices className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-black text-sm uppercase tracking-widest" style={{ fontFamily: 'Oswald, sans-serif' }}>Speed Touch</span>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 rounded-xl text-white/40 hover:text-white transition-colors hover:bg-white/10">
            <BsX className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <div className="p-4 flex-1">
          <div className="space-y-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                style={{ fontFamily: 'Poppins, sans-serif' }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold uppercase tracking-widest transition-all ${
                    isActive
                      ? 'text-white bg-white/10 border border-white/10'
                      : 'text-white/50 hover:text-white hover:bg-white/6'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: isActive ? '#159be3' : 'rgba(255,255,255,0.2)' }} />
                    {label}
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#159be3' }} />}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Drawer footer */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {token ? (
            <div className="space-y-2">
              <button
                onClick={() => { navigate('/order'); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all hover:bg-white/8"
              >
                <BsClockHistory className="w-4 h-4 text-white/40 flex-shrink-0" />
                <span className="text-sm font-semibold text-white/60" style={{ fontFamily: 'Poppins, sans-serif' }}>My Orders</span>
              </button>
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all hover:bg-red-500/10"
              >
                <BsBoxArrowRight className="w-4 h-4 text-red-400/60 flex-shrink-0" />
                <span className="text-sm font-semibold text-red-400/70" style={{ fontFamily: 'Poppins, sans-serif' }}>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => { navigate('/login'); setOpen(false); }}
              className="w-full py-3.5 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all"
              style={{ background: 'linear-gradient(135deg, #159be3, #0e7ab8)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 16px rgba(21,155,227,0.3)' }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
