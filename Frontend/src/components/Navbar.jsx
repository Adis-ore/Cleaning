import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsCart3, BsPerson, BsSearch, BsX } from "react-icons/bs";
import React, { useContext, useEffect, useState } from "react";
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
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(Shopcontext);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #f1f5f9',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between" style={{ height: '72px' }}>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={assets.speedtouch} alt="Speed Touch" className="h-9 w-auto object-contain" />
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                style={{ fontFamily: 'Poppins, sans-serif' }}
                className={({ isActive }) =>
                  `text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
                    isActive ? 'text-[#159be3]' : 'text-[#1A1A2E]/60 hover:text-[#159be3]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2.5 rounded-xl transition-colors text-[#1A1A2E]/50 hover:text-[#159be3]"
            >
              <BsSearch className="w-[17px] h-[17px]" />
            </button>

            <div className="relative group">
              <button
                onClick={() => !token && navigate('/login')}
                className="p-2.5 rounded-xl transition-colors text-[#1A1A2E]/50 hover:text-[#159be3]"
              >
                <BsPerson className="w-[17px] h-[17px]" />
              </button>
              {token && (
                <div className="hidden lg:block absolute right-0 top-full pt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="rounded-2xl p-2" style={{ background: '#ffffff', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: '1px solid #f1f5f9' }}>
                    <button onClick={() => navigate('/order')} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#1A1A2E] hover:bg-[#f0f9ff] hover:text-[#159be3] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      My Orders
                    </button>
                    <button onClick={logout} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative p-2.5 rounded-xl transition-colors text-[#1A1A2E]/50 hover:text-[#159be3]">
              <BsCart3 className="w-[17px] h-[17px]" />
              {getCartCount() > 0 && (
                <span className="absolute top-1.5 right-1.5 w-[14px] h-[14px] rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: '#159be3' }}>
                  {getCartCount()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2.5 rounded-xl transition-colors text-[#1A1A2E]/50 hover:text-[#159be3] ml-1"
            >
              <HiOutlineMenuAlt3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[99] lg:hidden" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div
        className="fixed inset-y-0 right-0 z-[100] w-72 lg:hidden transition-transform duration-300"
        style={{
          background: '#ffffff',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <img src={assets.speedtouch} alt="Speed Touch" className="h-8 w-auto" />
          <button onClick={() => setOpen(false)} className="p-2 rounded-xl text-gray-400 hover:text-[#159be3] transition-colors">
            <BsX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={{ fontFamily: 'Poppins, sans-serif' }}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest transition-colors ${
                  isActive ? 'text-[#159be3] bg-[#f0f9ff]' : 'text-[#1A1A2E] hover:bg-gray-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="px-5 pt-4" style={{ borderTop: '1px solid #f1f5f9' }}>
          {token ? (
            <div className="space-y-2">
              <button onClick={() => { navigate('/order'); setOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#1A1A2E] hover:bg-gray-50 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                My Orders
              </button>
              <button onClick={() => { logout(); setOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { navigate('/login'); setOpen(false); }}
              className="w-full py-3 rounded-2xl text-white font-semibold text-sm uppercase tracking-widest"
              style={{ background: '#159be3', fontFamily: 'Poppins, sans-serif' }}
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
