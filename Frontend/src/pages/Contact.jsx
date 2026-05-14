import React, { useState } from 'react';
import { assets } from '../assets/assets';
import NewLetter from '../components/NewLetter';
import { BsTelephone, BsEnvelope, BsGeoAlt, BsArrowRight } from 'react-icons/bs';
import { MdOutlineSchedule } from 'react-icons/md';

const inputClass = "w-full border border-gray-200 px-4 py-3 text-sm font-semibold text-[#1A1A2E] placeholder:text-gray-400 focus:outline-none focus:border-[#159be3] transition-colors bg-white";

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const onChange = (e) => setForm((d) => ({ ...d, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    alert('Message received! We will contact you shortly.');
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <div className="bg-[#0d1b2a] py-14 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#f6e5b7]" />
            <span className="text-[#f6e5b7] text-xs font-bold uppercase tracking-[0.25em]">Get In Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase">
            Contact <span className="text-[#159be3]">Us</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[2px] bg-[#159be3]" />
              <span className="text-[#159be3] text-xs font-bold uppercase tracking-[0.25em]">Reach Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] uppercase mb-6 leading-tight">
              Let's Sanitize<br />
              <span className="text-[#159be3]">Your Space</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              Ready to book a cleaning service or need a quote? Reach out to our team — we are always available to schedule an appointment that fits your timeline.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { Icon: BsTelephone, label: 'Phone', value: '+234 802 077 6686', href: 'tel:+2348020776686' },
                { Icon: BsEnvelope, label: 'Email', value: 'speedtouchcleaning@gmail.com', href: 'mailto:speedtouchcleaning@gmail.com' },
                { Icon: BsGeoAlt, label: 'Address', value: 'No 7 Oluyoro Street, off Awolowo Avenue, Old Bodija, Ibadan, Oyo State', href: null },
                { Icon: MdOutlineSchedule, label: 'Hours', value: 'Monday – Saturday: 7:00am – 7:00pm', href: null },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#159be3]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#159be3]" />
                  </div>
                  <div>
                    <p className="font-black text-[#1A1A2E] text-xs uppercase tracking-wider mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-gray-500 text-sm font-semibold hover:text-[#159be3] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-500 text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden h-52 sm:h-64 bg-gray-100 border border-gray-200">
              <img src={assets.contact} className="w-full h-full object-cover" alt="Contact" />
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <div className="bg-[#f9fafc] border border-gray-100 p-8">
              <h3 className="font-black text-[#1A1A2E] text-sm uppercase tracking-widest mb-6 pb-4 border-b border-gray-200">
                Send Us a Message
              </h3>
              <form onSubmit={onSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Full Name" required onChange={onChange} value={form.name} className={inputClass} />
                <input type="email" name="email" placeholder="Email Address" required onChange={onChange} value={form.email} className={inputClass} />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={onChange} value={form.phone} className={inputClass} />
                <select name="service" onChange={onChange} value={form.service} className={inputClass}>
                  <option value="">Select a Service</option>
                  <option>Residential Cleaning</option>
                  <option>Fumigation & Pest Control</option>
                  <option>Hotel & Hospitality Cleaning</option>
                  <option>Post-Construction Cleanup</option>
                  <option>Office & Commercial Cleaning</option>
                  <option>Laundry & Fabric Care</option>
                  <option>Other</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Describe your cleaning needs..."
                  rows={5}
                  onChange={onChange}
                  value={form.message}
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#159be3] text-white font-black text-sm uppercase tracking-widest hover:bg-[#0e7ab8] transition-colors group"
                >
                  Send Message
                  <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <NewLetter />
    </div>
  );
};

export default Contact;
