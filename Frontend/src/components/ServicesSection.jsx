import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight, BsBuilding } from 'react-icons/bs';
import { MdOutlineCleaningServices, MdLocalLaundryService } from 'react-icons/md';
import { GiChemicalDrop } from 'react-icons/gi';
import { FaHotel } from 'react-icons/fa';
import { RiBuilding4Line } from 'react-icons/ri';

const services = [
  {
    icon: MdOutlineCleaningServices,
    title: 'Residential Cleaning',
    desc: 'Deep sanitization for every room in your home.',
    bg: 'linear-gradient(135deg, #159be3, #0e7ab8)',
    shadow: 'rgba(21,155,227,0.35)',
  },
  {
    icon: GiChemicalDrop,
    title: 'Fumigation & Pest Control',
    desc: 'Industrial-grade pest elimination treatments.',
    bg: 'linear-gradient(135deg, #1a3a5c, #0d1b2a)',
    shadow: 'rgba(13,27,42,0.5)',
  },
  {
    icon: FaHotel,
    title: 'Hotel & Hospitality',
    desc: 'Hospitality-standard turnover cleaning.',
    bg: 'linear-gradient(135deg, #159be3, #0d1b2a)',
    shadow: 'rgba(21,155,227,0.25)',
  },
  {
    icon: RiBuilding4Line,
    title: 'Post-Construction',
    desc: 'Complete dust and debris removal.',
    bg: 'linear-gradient(135deg, #0d1b2a, #159be3)',
    shadow: 'rgba(21,155,227,0.25)',
  },
  {
    icon: BsBuilding,
    title: 'Office & Commercial',
    desc: 'Scheduled cleaning for workplaces.',
    bg: 'linear-gradient(135deg, #1a3a5c, #159be3)',
    shadow: 'rgba(21,155,227,0.3)',
  },
  {
    icon: MdLocalLaundryService,
    title: 'Laundry & Fabric Care',
    desc: 'Expert stain removal and fabric restoration.',
    bg: 'linear-gradient(135deg, #159be3, #0e7ab8)',
    shadow: 'rgba(21,155,227,0.35)',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 50%, #f0f9ff 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-25 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #dbeafe, transparent)' }} />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)', opacity: 0.15 }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5" style={{ background: 'rgba(21,155,227,0.1)', border: '1px solid rgba(21,155,227,0.2)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#159be3' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#159be3', fontFamily: 'Poppins, sans-serif' }}>What We Do</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black uppercase leading-tight" style={{ fontFamily: 'Oswald, sans-serif', color: '#0d1b2a' }}>
              Professional<br />
              <span style={{ color: '#159be3' }}>Cleaning Services</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 group"
            style={{ background: '#0d1b2a', color: '#ffffff', fontFamily: 'Poppins, sans-serif' }}
          >
            All Services
            <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, desc, bg, shadow }, i) => (
            <Link
              key={i}
              to="/services"
              className="group relative overflow-hidden rounded-3xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(21,155,227,0.15)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* Top color strip */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: bg }} />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: bg,
                  boxShadow: `0 8px 24px ${shadow}`,
                }}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>

              <div>
                <h3 className="font-black text-base uppercase mb-2" style={{ fontFamily: 'Oswald, sans-serif', color: '#0d1b2a' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', color: '#6b7280' }}>
                  {desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mt-auto transition-all group-hover:gap-4" style={{ color: '#159be3', fontFamily: 'Poppins, sans-serif' }}>
                Learn More <BsArrowRight className="w-3 h-3" />
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(21,155,227,0.04), rgba(13,27,42,0.04))' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
