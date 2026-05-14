import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { BsInstagram, BsTiktok, BsFacebook, BsTelephone, BsEnvelope, BsGeoAlt } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer style={{ background: '#0d1b2a' }}>
      <div className="h-1" style={{ background: 'linear-gradient(90deg, transparent, #159be3, #f6e5b7, #159be3, transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={assets.speedtouch} className="h-10 w-auto mb-6" alt="Speed Touch" />
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Poppins, sans-serif' }}>
              Speed Touch delivers premium cleaning, sanitization, and hygiene services across Nigeria — trusted by hundreds of homes, hotels, and businesses.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://www.instagram.com/speedtouch_cleanings/', Icon: BsInstagram, label: 'Instagram' },
                { href: 'https://www.tiktok.com/@speedtouchcleanin', Icon: BsTiktok, label: 'TikTok' },
                { href: '#', Icon: BsFacebook, label: 'Facebook' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-200 rounded-xl"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-6" style={{ color: '#f6e5b7', fontFamily: 'Poppins, sans-serif' }}>Navigation</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/collection', label: 'Shop' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm font-semibold transition-colors flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-200 flex-shrink-0" style={{ background: '#159be3' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-6" style={{ color: '#f6e5b7', fontFamily: 'Poppins, sans-serif' }}>Our Services</h4>
            <ul className="space-y-3">
              {[
                'Residential Cleaning',
                'Fumigation & Pest Control',
                'Hotel & Hospitality',
                'Post-Construction Cleanup',
                'Office Cleaning',
                'Laundry & Fabric Care',
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm font-semibold transition-colors flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-200 flex-shrink-0" style={{ background: '#159be3' }} />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-6" style={{ color: '#f6e5b7', fontFamily: 'Poppins, sans-serif' }}>Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+2348020776686" className="flex items-start gap-3 transition-colors group" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <BsTelephone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>+234 802 077 6686</span>
                </a>
              </li>
              <li>
                <a href="mailto:speedtouchcleaning@gmail.com" className="flex items-start gap-3 transition-colors group" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <BsEnvelope className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>speedtouchcleaning@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <BsGeoAlt className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#f6e5b7' }} />
                <span className="text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>No 7 Oluyoro Street, Old Bodija, Ibadan, Oyo State</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px mb-8" style={{ background: 'rgba(255,255,255,0.08)' }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Poppins, sans-serif' }}>
            &copy; 2025 Speed Touch Cleaning Services. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link key={item} to="#" className="text-xs font-semibold transition-colors" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Poppins, sans-serif' }}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
