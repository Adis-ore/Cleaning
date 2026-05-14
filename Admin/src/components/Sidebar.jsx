import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { BsPlusSquare, BsGrid, BsBoxSeam } from "react-icons/bs";

const navItems = [
  { to: "/add",    Icon: BsPlusSquare, label: "Add Product" },
  { to: "/list",   Icon: BsGrid,       label: "Products"    },
  { to: "/orders", Icon: BsBoxSeam,    label: "Orders"      },
];

const Sidebar = () => {
  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: '#0d1b2a',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>

      {/* Logo */}
      <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <img src={assets.speedtouch} alt="Speed Touch" style={{ height: '36px', width: 'auto' }} />
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '8px', fontFamily: 'Poppins, sans-serif' }}>
          Admin Dashboard
        </p>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 8px', marginBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
          Menu
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(({ to, Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 14px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px', fontWeight: 600,
                background: isActive ? 'rgba(21,155,227,0.18)' : 'transparent',
                color: isActive ? '#159be3' : 'rgba(255,255,255,0.5)',
                borderLeft: isActive ? '3px solid #159be3' : '3px solid transparent',
                transition: 'all 0.15s ease',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom version tag */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
          Speed Touch v1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
