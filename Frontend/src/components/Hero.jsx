import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&q=90',
    label: 'Residential Cleaning',
    line1: 'Spotless Homes,',
    line2: 'Healthier Lives',
    sub: 'Deep sanitization for every corner of your living space — professionally done.',
  },
  {
    image: 'https://images.unsplash.com/photo-1527515637462-cff94aca0875?w=1600&h=900&fit=crop&q=90',
    label: 'Post-Construction',
    line1: 'From Dust',
    line2: 'To Pristine',
    sub: 'Complete debris and dust removal after construction or renovation.',
  },
  {
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&h=900&fit=crop&q=90',
    label: 'Fumigation',
    line1: 'Eliminate Pests,',
    line2: 'Reclaim Your Space',
    sub: 'Industrial-grade fumigation treatments for homes and commercial properties.',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&q=90',
    label: 'Commercial & Office',
    line1: 'Immaculate',
    line2: 'Work Environments',
    sub: 'Scheduled professional cleaning that keeps your workplace spotless daily.',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>

      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.7) 60%, rgba(13,27,42,0.3) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div style={{ maxWidth: '640px' }}>

            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ width: '32px', height: '2px', background: '#f6e5b7' }} />
              <span style={{ color: '#f6e5b7', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', fontFamily: 'Poppins, sans-serif' }}>
                {slides[current].label}
              </span>
            </div>

            {/* Headings */}
            <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(52px, 8vw, 88px)', fontWeight: 900, color: '#ffffff', lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '8px' }}>
              {slides[current].line1}
            </h1>
            <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(52px, 8vw, 88px)', fontWeight: 900, color: '#159be3', lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '28px' }}>
              {slides[current].line2}
            </h1>

            {/* Sub */}
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.7, maxWidth: '420px', marginBottom: '40px', fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
              {slides[current].sub}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link
                to="/services"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '14px 28px',
                  background: '#159be3', color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                  fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                className="group hover:bg-[#0e7ab8]"
              >
                Book A Service
                <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/collection"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '14px 28px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                  fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
                className="hover:border-white"
              >
                Shop Supplies
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '40px', marginTop: '52px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {[['500+', 'Clients'], ['8', 'Services'], ['100%', 'Guaranteed']].map(([v, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '26px', fontWeight: 900, color: '#f6e5b7' }}>{v}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '4px', fontFamily: 'Poppins, sans-serif' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.1)' }}>
        <div
          style={{
            height: '100%', background: '#159be3',
            width: `${((current + 1) / slides.length) * 100}%`,
            transition: 'width 1s ease',
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
