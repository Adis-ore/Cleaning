import React from 'react';
import { assets } from '../assets/assets';
import NewLetter from '../components/NewLetter';
import { BsArrowRight } from 'react-icons/bs';
import { MdOutlineVerified } from 'react-icons/md';
import { RiLeafLine } from 'react-icons/ri';
import { BiTrophy } from 'react-icons/bi';

const whyUs = [
  {
    icon: MdOutlineVerified,
    title: 'Quality Assurance',
    desc: 'At Speed Touch, quality is not an option — it is our standard. Every service we deliver is backed by rigorous quality checks. From the disinfectants we apply to the attention we bring to every surface, our goal is to exceed your expectations, not just meet them.',
  },
  {
    icon: RiLeafLine,
    title: 'Eco-Safe Products',
    desc: 'We care about your health and the environment. Every cleaning agent and disinfectant we use is non-toxic, biodegradable, and safe for families, children, and pets — without compromising cleaning power.',
  },
  {
    icon: BiTrophy,
    title: 'Affordable Excellence',
    desc: 'Premium cleaning services should not come with a prohibitive price tag. We offer competitive rates without cutting corners, giving you professional-grade results that respect your budget.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <div className="bg-[#0d1b2a] py-14 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#f6e5b7]" />
            <span className="text-[#f6e5b7] text-xs font-bold uppercase tracking-[0.25em]">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase">
            About <span className="text-[#159be3]">Speed Touch</span>
          </h1>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="overflow-hidden">
            <img
              src={assets.about}
              className="w-full h-80 lg:h-[500px] object-cover"
              alt="Speed Touch Team"
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[2px] bg-[#159be3]" />
              <span className="text-[#159be3] text-xs font-bold uppercase tracking-[0.25em]">Who We Are</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] uppercase mb-6 leading-tight">
              Nigeria's Premier<br />
              <span className="text-[#159be3]">Cleaning Authority</span>
            </h2>
            <div className="space-y-5 text-gray-500 text-sm sm:text-base leading-relaxed">
              <p>
                At Speed Touch Cleaning and Hygiene Services, we believe a clean space is a healthy space. We are committed to delivering top-tier sanitization and cleaning solutions that do not merely refresh your environment — they promote well-being, productivity, and peace of mind.
              </p>
              <p>
                With a passion for excellence and a keen eye for detail, our trained team handles everything from residential deep-cleans and fumigations to hotel turnover services and post-construction debris removal. We deploy eco-friendly products and modern equipment to ensure every corner shines without compromise.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-black text-[#1A1A2E] text-sm uppercase tracking-wide mb-2">Our Mission</p>
                <p>
                  To deliver fast, reliable, and top-quality cleaning and hygiene services that elevate living and working environments. At Speed Touch, we are driven by excellence, guided by integrity, and committed to creating healthier spaces — one touch at a time.
                </p>
              </div>
            </div>

            <div className="flex gap-8 mt-10 pt-8 border-t border-gray-100">
              {[
                { value: '500+', label: 'Happy Clients' },
                { value: '6+', label: 'Years Active' },
                { value: '8', label: 'Services Offered' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black text-[#159be3]">{value}</p>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-0">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#159be3]" />
              <span className="text-[#159be3] text-xs font-bold uppercase tracking-[0.25em]">Our Edge</span>
              <div className="w-6 h-[2px] bg-[#159be3]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] uppercase">
              Why Choose <span className="text-[#159be3]">Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="p-8 border border-gray-100 hover:border-[#159be3]/40 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#159be3]/10 flex items-center justify-center mb-6 group-hover:bg-[#159be3] transition-colors">
                  <Icon className="w-6 h-6 text-[#159be3] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-black text-[#1A1A2E] text-sm uppercase tracking-widest mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewLetter />
    </div>
  );
};

export default About;
