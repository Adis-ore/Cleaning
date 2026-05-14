import React from "react";
import { assets } from "../assets/assets";
import { BsPower, BsBell } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Navbar = ({ setToken }) => {
  return (
    <header style={{
      height: '64px',
      background: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
      flexShrink: 0,
      boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
    }}>

      {/* Left — page identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #159be3, #0e7ab8)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MdOutlineAdminPanelSettings style={{ width: '18px', height: '18px', color: '#ffffff' }} />
        </div>
        <div>
          <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '14px', fontWeight: 700, color: '#0d1b2a', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1 }}>
            Admin Panel
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', color: '#9ca3af', fontWeight: 500, marginTop: '2px' }}>
            Speed Touch Control Centre
          </p>
        </div>
      </div>

      {/* Right — actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button style={{
          width: '36px', height: '36px', borderRadius: '10px',
          border: '1px solid #f1f5f9', background: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#6b7280', cursor: 'pointer',
        }}>
          <BsBell style={{ width: '15px', height: '15px' }} />
        </button>

        <div style={{ width: '1px', height: '24px', background: '#f1f5f9', margin: '0 4px' }} />

        <button
          onClick={() => setToken("")}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px',
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: '10px',
            color: '#e11d48',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#ffe4e6'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff1f2'}
        >
          <BsPower style={{ width: '13px', height: '13px' }} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
