import React from 'react';
import { BiShield, BiTime } from 'react-icons/bi';
import { MdOutlineSupportAgent, MdVerified } from 'react-icons/md';
import { RiLeafLine, RiAwardLine } from 'react-icons/ri';
import { BsStarFill } from 'react-icons/bs';

const policies = [
  {
    icon: BiShield,
    title: 'Satisfaction Guaranteed',
    desc: 'Every service is backed by our quality assurance commitment. Not satisfied? We return at no extra charge until the job meets your standard.',
    stat: '100%',
    statLabel: 'Satisfaction Rate',
    iconBg: '#159be3',
    accent: '#159be3',
  },
  {
    icon: RiLeafLine,
    title: 'Eco-Safe Products',
    desc: 'All cleaning agents and disinfectants we use are non-toxic, biodegradable, and safe for children, pets, and the environment.',
    stat: '0%',
    statLabel: 'Toxic Chemicals',
    iconBg: '#0d9f6e',
    accent: '#0d9f6e',
  },
  {
    icon: MdOutlineSupportAgent,
    title: '24/7 Customer Support',
    desc: 'Our team is available around the clock to schedule appointments, answer questions, and handle urgent cleaning requests.',
    stat: '24/7',
    statLabel: 'Always Available',
    iconBg: '#e8a020',
    accent: '#f6e5b7',
  },
];

const OurPolicies = () => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #0f2540 50%, #0d1b2a 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #159be3, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #f6e5b7, transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <RiAwardLine className="w-4 h-4" style={{ color: '#f6e5b7' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f6e5b7', fontFamily: 'Poppins, sans-serif' }}>Our Standards</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-white uppercase leading-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Why Clients{' '}
            <span style={{ color: '#159be3' }}>Trust Us</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <BsStarFill key={i} className="w-4 h-4" style={{ color: '#f6e5b7' }} />
            ))}
            <span className="text-sm font-semibold ml-2" style={{ color: 'rgba(255,255,255,0.4)' }}>500+ satisfied clients</span>
          </div>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {policies.map(({ icon: Icon, title, desc, stat, statLabel, iconBg, accent }, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                border: `1px solid rgba(255,255,255,0.12)`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, ${iconBg}, transparent)` }} />

              {/* Icon + Stat row */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${iconBg}, ${iconBg}cc)` }}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black" style={{ fontFamily: 'Oswald, sans-serif', color: accent }}>{stat}</p>
                  <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{statLabel}</p>
                </div>
              </div>

              <h3 className="font-black text-white text-lg uppercase mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Poppins, sans-serif' }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: MdVerified, label: 'Verified Professionals' },
            { icon: BiTime, label: 'On-Time Always' },
            { icon: BiShield, label: 'Insured & Bonded' },
            { icon: RiLeafLine, label: 'Green Certified' },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Icon className="w-5 h-5 flex-shrink-0" style={{ color: '#159be3' }} />
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicies;
