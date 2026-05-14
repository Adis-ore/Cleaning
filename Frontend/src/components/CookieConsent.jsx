import React, { useState, useEffect } from 'react';
import { BsShieldCheck } from 'react-icons/bs';
import { MdOutlineCookie } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('speedtouch_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('speedtouch_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('speedtouch_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '0 16px 16px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          background: '#0d1b2a',
          border: '1px solid rgba(21,155,227,0.3)',
          borderRadius: '20px',
          padding: '20px 24px',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.35)',
          pointerEvents: 'all',
          animation: 'fadeUp 0.4s ease both',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>

          {/* Icon */}
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(21,155,227,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MdOutlineCookie style={{ width: '20px', height: '20px', color: '#159be3' }} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: '#ffffff', fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              We Use Cookies
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Poppins, sans-serif', fontSize: '12px', lineHeight: 1.6, marginBottom: '16px' }}>
              We use cookies to improve your browsing experience and analyse site traffic. By clicking{' '}
              <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Accept</strong>, you agree to our use of cookies.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={accept}
                style={{
                  background: 'linear-gradient(135deg, #159be3, #0e7ab8)',
                  color: '#fff',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '10px 22px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <BsShieldCheck style={{ width: '14px', height: '14px' }} />
                Accept All
              </button>

              <button
                onClick={decline}
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                }}
              >
                Decline
              </button>

              <Link
                to="/about"
                style={{ color: 'rgba(21,155,227,0.8)', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 600, marginLeft: 'auto' }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
