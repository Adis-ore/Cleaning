import React, { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { BsArrowRight, BsEye, BsEyeSlash, BsShieldLock } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Login = ({ setToken, adminEmail, adminPassword }) => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === adminEmail && password === adminPassword) {
        const token = 'admin-token-' + Date.now();
        setToken(token);
        localStorage.setItem("adminToken", token);
        toast.success("Welcome back, Admin!");
      } else {
        toast.error("Invalid email or password.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc' }}>

      {/* Left branding panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 60%, #0d1b2a 100%)' }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
          opacity: 0.03,
        }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #159be3, transparent)', opacity: 0.15 }} />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #f6e5b7, transparent)', opacity: 0.1 }} />

        <div className="relative z-10 p-12">
          <img src={assets.speedtouch} alt="Speed Touch" style={{ height: '44px', width: 'auto' }} />
        </div>

        <div className="relative z-10 px-12 pb-16">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '2px', background: '#f6e5b7' }} />
            <span style={{ color: '#f6e5b7', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', fontFamily: 'Poppins, sans-serif' }}>Admin Access</span>
          </div>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '52px', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', lineHeight: 1, marginBottom: '8px' }}>
            Manage Your
          </h1>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '52px', fontWeight: 900, color: '#159be3', textTransform: 'uppercase', lineHeight: 1, marginBottom: '24px' }}>
            Business
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.7, maxWidth: '380px', fontFamily: 'Poppins, sans-serif' }}>
            Add products, manage orders, and oversee operations from one central dashboard.
          </p>

          <div style={{ display: 'flex', gap: '32px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[['Products', 'Manage catalogue'], ['Orders', 'Track & update'], ['Analytics', 'Monitor sales']].map(([t, s]) => (
              <div key={t}>
                <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '16px', fontWeight: 700, color: '#f6e5b7', textTransform: 'uppercase' }}>{t}</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '3px', fontFamily: 'Poppins, sans-serif' }}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div style={{ width: '100%', maxWidth: '420px' }}>

          <div className="flex lg:hidden justify-center mb-10">
            <img src={assets.speedtouch} alt="Speed Touch" style={{ height: '40px', width: 'auto' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #159be3, #0e7ab8)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MdOutlineAdminPanelSettings style={{ width: '26px', height: '26px', color: '#ffffff' }} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '22px', fontWeight: 700, color: '#0d1b2a', textTransform: 'uppercase' }}>Admin Login</h2>
              <p style={{ color: '#9ca3af', fontSize: '12px', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>Speed Touch Control Panel</p>
            </div>
          </div>

          <form onSubmit={onSubmitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0d1b2a', marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@speedtouch.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #f1f5f9', borderRadius: '12px', fontSize: '14px', fontWeight: 500, color: '#0d1b2a', background: '#ffffff', fontFamily: 'Poppins, sans-serif', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#159be3'}
                onBlur={e => e.target.style.borderColor = '#f1f5f9'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0d1b2a', marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '12px 48px 12px 16px', border: '2px solid #f1f5f9', borderRadius: '12px', fontSize: '14px', fontWeight: 500, color: '#0d1b2a', background: '#ffffff', fontFamily: 'Poppins, sans-serif', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#159be3'}
                  onBlur={e => e.target.style.borderColor = '#f1f5f9'}
                />
                <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {showPass ? <BsEyeSlash style={{ width: '16px', height: '16px' }} /> : <BsEye style={{ width: '16px', height: '16px' }} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? '#93c5fd' : '#159be3', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Poppins, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s', marginTop: '4px' }}
            >
              {loading ? 'Signing In...' : 'Sign In to Dashboard'}
              {!loading && <BsArrowRight style={{ width: '16px', height: '16px' }} />}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '24px' }}>
            <BsShieldLock style={{ width: '13px', height: '13px', color: '#9ca3af' }} />
            <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>Secured admin access only</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
