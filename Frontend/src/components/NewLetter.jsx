import React, { useState } from 'react';
import { BsArrowRight, BsEnvelopeCheck } from 'react-icons/bs';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { RiLeafLine } from 'react-icons/ri';
import { BiShieldAlt2 } from 'react-icons/bi';

const perks = [
  { icon: MdOutlineCleaningServices, text: 'Professional cleaning tips weekly' },
  { icon: RiLeafLine, text: 'Eco-friendly product guides' },
  { icon: BiShieldAlt2, text: 'Exclusive subscriber discounts' },
];

const NewLetter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setName('');
  };

  return (
    <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(135deg, #159be3 0%, #0e7ab8 50%, #0d1b2a 100%)' }}>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px',
      }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #f6e5b7, transparent)', opacity: 0.15 }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #ffffff, transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <BsEnvelopeCheck className="w-4 h-4" style={{ color: '#f6e5b7' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f6e5b7', fontFamily: 'Poppins, sans-serif' }}>Join Our Community</span>
            </div>

            <h2 className="text-5xl sm:text-6xl font-black text-white uppercase leading-tight mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Cleaning Tips<br />
              <span style={{ color: '#f6e5b7' }}>&amp; Exclusive Offers</span>
            </h2>

            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Poppins, sans-serif' }}>
              Subscribe to receive hygiene guides, seasonal cleaning checklists, and special discounts delivered straight to your inbox.
            </p>

            <div className="space-y-4">
              {perks.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div className="rounded-3xl p-8 sm:p-10" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <BsEnvelopeCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>You're In!</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Poppins, sans-serif' }}>Welcome to the Speed Touch community. Check your inbox for a confirmation.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black text-white uppercase mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>Subscribe Now</h3>
                <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif' }}>No spam, ever. Unsubscribe anytime.</p>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif' }}>Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#ffffff',
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif' }}>Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#ffffff',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 group mt-2"
                    style={{ background: '#f6e5b7', color: '#0d1b2a', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Subscribe — It's Free
                    <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
                <p className="text-center text-xs font-semibold mt-4" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Poppins, sans-serif' }}>
                  By subscribing you agree to our privacy policy
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewLetter;
