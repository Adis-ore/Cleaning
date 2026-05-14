import React from 'react';
import { BsMegaphone } from 'react-icons/bs';

const announcements = [
  'Free delivery on all orders above ₦10,000!',
  'New arrivals: Industrial-grade degreasers now in stock',
  'Speed Touch Fumigation — Book now for exclusive rates',
  'Same-day delivery available in Lagos & Ibadan',
  'Professional cleaning supplies trusted by 500+ businesses across Nigeria',
];

const text = announcements.join('   ·   ');

const NewsTicker = () => {
  return (
    <div style={{ background: '#0d1b2a', overflow: 'hidden', borderBottom: '1px solid rgba(21,155,227,0.25)', position: 'relative', zIndex: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '36px' }}>
        {/* Label */}
        <div style={{ background: '#159be3', padding: '0 14px', height: '100%', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <BsMegaphone style={{ width: '12px', height: '12px', color: 'white' }} />
          <span style={{ color: 'white', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Oswald, sans-serif', whiteSpace: 'nowrap' }}>
            News
          </span>
        </div>
        {/* Scrolling text */}
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{ display: 'inline-flex', animation: 'ticker-scroll 35s linear infinite', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', fontWeight: 600, padding: '0 48px', fontFamily: 'Poppins, sans-serif' }}>
              {text}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', fontWeight: 600, padding: '0 48px', fontFamily: 'Poppins, sans-serif' }}>
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
