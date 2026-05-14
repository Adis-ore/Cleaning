import React, { useState } from 'react';
import { BsArrowRight, BsArrowLeft, BsCheck2, BsPlayCircleFill, BsCameraVideo, BsImages, BsStarFill } from 'react-icons/bs';
import { MdOutlineCleaningServices, MdLocalLaundryService } from 'react-icons/md';
import { GiChemicalDrop, GiVacuumCleaner } from 'react-icons/gi';
import { FaHotel, FaBuilding } from 'react-icons/fa';
import { RiBuilding4Line } from 'react-icons/ri';
import NewLetter from '../components/NewLetter';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    icon: MdOutlineCleaningServices,
    title: 'Residential House Cleaning',
    shortDesc: 'Complete sanitization of your home — from living areas to kitchens and bathrooms.',
    fullDesc: 'Our residential cleaning service covers every inch of your home. We deep-scrub floors, disinfect high-touch surfaces, degrease kitchen appliances, sanitize bathrooms, dust furniture and fixtures, and ensure every room meets professional hygiene standards.',
    includes: [
      'Full surface disinfection',
      'Kitchen degreasing & sanitization',
      'Bathroom scrubbing & descaling',
      'Floor mopping & vacuuming',
      'Window & fixture wiping',
      'Dusting all surfaces',
    ],
    tag: 'Most Popular',
    videoId: 'dQw4w9WgXcQ',
    projects: [
      {
        label: 'Living Room',
        before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=700&h=450&fit=crop',
      },
      {
        label: 'Kitchen',
        before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=700&h=450&fit=crop',
      },
      {
        label: 'Bathroom',
        before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1620626011761-996317702519?w=700&h=450&fit=crop',
      },
      {
        label: 'Bedroom',
        before: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&h=450&fit=crop',
      },
    ],
  },
  {
    id: 2,
    icon: GiChemicalDrop,
    title: 'Fumigation & Pest Control',
    shortDesc: 'Industrial-grade fumigation for homes, hotels, and commercial properties.',
    fullDesc: 'Our fumigation team uses certified, approved pesticides and fumigation methods to eliminate cockroaches, rodents, bedbugs, termites, mosquitoes, and other pests. We treat all areas including hidden cavities, wall gaps, and hard-to-reach zones.',
    includes: [
      'Full property inspection',
      'Targeted pesticide application',
      'Cockroach & rodent treatment',
      'Bedbug elimination',
      'Termite & ant treatment',
      'Post-treatment safety briefing',
    ],
    tag: null,
    videoId: null,
    projects: [
      {
        label: 'Residential Property',
        before: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=700&h=450&fit=crop',
      },
      {
        label: 'Commercial Space',
        before: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1497366754035-f200581f2b39?w=700&h=450&fit=crop',
      },
    ],
  },
  {
    id: 3,
    icon: FaHotel,
    title: 'Hotel & Hospitality Cleaning',
    shortDesc: 'Hospitality-grade cleaning for hotels, guest houses, and short-let apartments.',
    fullDesc: 'We understand the hygiene standards demanded by the hospitality industry. Our hotel cleaning service handles room turnovers, linen management, public area disinfection, lobby maintenance, and deep periodic cleans.',
    includes: [
      'Room turnover & bed linen change',
      'Bathroom deep disinfection',
      'Public areas & lobby cleaning',
      'Restaurant & kitchen sanitation',
      'Pool area maintenance',
      'Periodic deep cleaning schedule',
    ],
    tag: null,
    videoId: null,
    projects: [
      {
        label: 'Guest Room',
        before: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=700&h=450&fit=crop',
      },
      {
        label: 'Hotel Bathroom',
        before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&h=450&fit=crop',
      },
      {
        label: 'Lobby & Common Areas',
        before: 'https://images.unsplash.com/photo-1497366754035-f200581f2b39?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&h=450&fit=crop',
      },
    ],
  },
  {
    id: 4,
    icon: RiBuilding4Line,
    title: 'Post-Construction Cleanup',
    shortDesc: 'Transforming worksites into clean, move-in ready spaces.',
    fullDesc: 'After construction or renovation, dust and debris can linger for weeks. Our post-construction team removes plaster dust, paint overspray, cement residue, adhesive marks, and all construction materials — leaving your new space spotless and ready for occupation.',
    includes: [
      'Debris and rubble removal',
      'Dust extraction from all surfaces',
      'Paint & cement stain removal',
      'Window cleaning (inside & out)',
      'Floor polishing & scrubbing',
      'Final walkthrough inspection',
    ],
    tag: null,
    videoId: null,
    projects: [
      {
        label: 'Construction Site',
        before: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=700&h=450&fit=crop',
      },
      {
        label: 'Renovation Cleanup',
        before: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&h=450&fit=crop',
      },
      {
        label: 'Floor Restoration',
        before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&h=450&fit=crop',
      },
    ],
  },
  {
    id: 5,
    icon: FaBuilding,
    title: 'Office & Commercial Cleaning',
    shortDesc: 'Scheduled professional cleaning for offices, malls, and warehouses.',
    fullDesc: 'A clean office is a productive office. We provide daily, weekly, or bi-weekly cleaning schedules for offices, corporate spaces, warehouses, and commercial facilities — maintaining sanitation across workstations, restrooms, canteens, and common areas.',
    includes: [
      'Workstation & desk sanitization',
      'Restroom deep cleaning',
      'Common area maintenance',
      'Floor buffing & mopping',
      'Waste disposal management',
      'Flexible scheduling options',
    ],
    tag: null,
    videoId: null,
    projects: [
      {
        label: 'Office Floor',
        before: 'https://images.unsplash.com/photo-1497366754035-f200581f2b39?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=450&fit=crop',
      },
      {
        label: 'Conference Room',
        before: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=700&h=450&fit=crop',
      },
    ],
  },
  {
    id: 6,
    icon: MdLocalLaundryService,
    title: 'Laundry Chemical Supply',
    shortDesc: 'Professional-grade laundry chemicals, detergents, and stain treatment solutions.',
    fullDesc: 'We supply commercial and industrial laundry chemicals for dry cleaners, hotels, hospitals, and laundry businesses. Our product range includes detergents, stain removers, fabric softeners, whiteners, and specialty treatment agents — sourced and tested for professional use.',
    includes: [
      'Concentrated wash detergents',
      'Stain pre-treatment agents',
      'Fabric softeners & conditioners',
      'Whitening & bleaching solutions',
      'Dry cleaning solvents',
      'Odour neutralisers',
    ],
    tag: null,
    videoId: null,
    projects: [
      {
        label: 'Stain Treatment',
        before: 'https://images.unsplash.com/photo-1517677129300-07b130802f98?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=700&h=450&fit=crop',
      },
      {
        label: 'Fabric Restoration',
        before: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=700&h=450&fit=crop',
      },
    ],
  },
  {
    id: 7,
    icon: GiVacuumCleaner,
    title: 'Deep Cleaning',
    shortDesc: 'Intensive top-to-bottom cleaning for properties requiring extra attention.',
    fullDesc: 'Our deep cleaning service tackles the buildup that routine cleaning misses — grout lines, behind appliances, inside cabinets, vents, and drainage areas. Ideal as a quarterly or annual treatment, it restores your space to a thoroughly sanitized state.',
    includes: [
      'Grout & tile deep scrubbing',
      'Behind-appliance cleaning',
      'Inside cabinet & drawer wipe-down',
      'Vent & air duct cleaning',
      'Drainage clearing',
      'Full property disinfection',
    ],
    tag: null,
    videoId: null,
    projects: [
      {
        label: 'Kitchen Deep Clean',
        before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=700&h=450&fit=crop',
      },
      {
        label: 'Bathroom Tiles',
        before: 'https://images.unsplash.com/photo-1527515637462-cff94aca0875?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1620626011761-996317702519?w=700&h=450&fit=crop',
      },
      {
        label: 'Full Property',
        before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=450&fit=crop',
        after: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=700&h=450&fit=crop',
      },
    ],
  },
];

/* ─── Before / After slider ─── */
const BeforeAfterSlider = ({ before, after, title }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = React.useRef(null);

  const updatePos = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl select-none cursor-col-resize"
      style={{ height: '280px' }}
      onMouseDown={(e) => { setDragging(true); updatePos(e.clientX); }}
      onMouseMove={(e) => { if (dragging) updatePos(e.clientX); }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
      onTouchStart={(e) => updatePos(e.touches[0].clientX)}
    >
      <img src={after} alt={`${title} — after`} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <img src={before} alt={`${title} — before`} className="absolute inset-0 h-full object-cover" style={{ width: `${10000 / sliderPos}%`, maxWidth: 'none' }} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-[#159be3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
          </svg>
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg pointer-events-none">Before</div>
      <div className="absolute top-3 right-3 bg-[#159be3] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg pointer-events-none">After</div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[9px] font-semibold px-3 py-1 rounded-full pointer-events-none">
        Drag to compare
      </div>
    </div>
  );
};

/* ─── Multi-project gallery ─── */
const ProjectGallery = ({ projects, title }) => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((p) => Math.max(0, p - 1));
  const next = () => setCurrent((p) => Math.min(projects.length - 1, p + 1));

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 700, color: '#159be3', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            {projects[current].label}
          </span>
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>
            ({current + 1}/{projects.length})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: current === 0 ? '#e5e7eb' : '#159be3', color: current === 0 ? '#9ca3af' : '#159be3' }}
          >
            <BsArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={next}
            disabled={current === projects.length - 1}
            className="w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: current === projects.length - 1 ? '#e5e7eb' : '#159be3', color: current === projects.length - 1 ? '#9ca3af' : '#159be3' }}
          >
            <BsArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <BeforeAfterSlider before={projects[current].before} after={projects[current].after} title={`${title} — ${projects[current].label}`} />

      {/* Dot indicators + thumbnails */}
      <div className="flex items-center gap-2 mt-3">
        {projects.map((p, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            title={p.label}
            className="relative overflow-hidden rounded-lg border-2 transition-all flex-1"
            style={{
              height: '52px',
              borderColor: i === current ? '#159be3' : '#f1f5f9',
              opacity: i === current ? 1 : 0.55,
            }}
          >
            <img src={p.after} alt={p.label} className="w-full h-full object-cover" />
            {i === current && (
              <div className="absolute inset-0 border-2 border-[#159be3] rounded-lg pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── Video card ─── */
const VideoCard = ({ videoId, title }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#0d1b2a]" style={{ height: '280px' }}>
      {playing ? (
        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      ) : (
        <>
          <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button onClick={() => setPlaying(true)} className="w-16 h-16 rounded-full bg-[#159be3] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform mb-3">
              <BsPlayCircleFill className="w-10 h-10 text-white" />
            </button>
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Watch Our Team in Action</p>
          </div>
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg">
            <BsCameraVideo className="w-3.5 h-3.5 text-[#159be3]" />
            <span className="text-white text-[10px] font-black uppercase tracking-wider">Video Proof</span>
          </div>
        </>
      )}
    </div>
  );
};

const Services = () => {
  const [selected, setSelected] = useState(null);
  const [proofTab, setProofTab] = useState('gallery');

  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 60%, #0d1b2a 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #159be3, transparent)' }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#f6e5b7]" />
            <span className="text-[#f6e5b7] text-xs font-bold uppercase tracking-[0.25em]">What We Offer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Our{' '}
            <span style={{ background: 'linear-gradient(90deg, #159be3, #f6e5b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Services
            </span>
          </h1>
          <p className="text-white/50 text-sm mt-4 max-w-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            From residential deep cleans to industrial fumigation — Speed Touch handles every hygiene challenge with precision, professionalism, and care.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                selected === service.id
                  ? 'border-[#159be3] shadow-2xl shadow-[#159be3]/10'
                  : 'border-gray-100 hover:border-[#159be3]/30 hover:shadow-lg'
              }`}
            >
              {/* Card Header */}
              <button
                className="w-full flex items-center gap-5 p-6 sm:p-7 text-left bg-white hover:bg-[#f9feff] transition-colors"
                onClick={() => setSelected(selected === service.id ? null : service.id)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${selected === service.id ? 'bg-gradient-to-br from-[#159be3] to-[#0e7ab8] shadow-lg shadow-[#159be3]/30' : 'bg-[#159be3]/10'}`}>
                  <service.icon className={`w-7 h-7 transition-colors ${selected === service.id ? 'text-white' : 'text-[#159be3]'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-[#0d1b2a] text-base sm:text-lg uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {service.title}
                    </h3>
                    {service.tag && (
                      <span className="bg-[#f6e5b7] text-[#0d1b2a] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm font-semibold truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{service.shortDesc}</p>
                </div>
                <div className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected === service.id ? 'border-[#159be3] bg-[#159be3]' : 'border-gray-200'}`}>
                  <span className={`text-xl font-black leading-none transition-transform inline-block ${selected === service.id ? 'text-white rotate-45' : 'text-gray-400'}`}>+</span>
                </div>
              </button>

              {/* Expanded Content */}
              {selected === service.id && (
                <div className="border-t-2 border-[#159be3]/10 bg-white">
                  <div className="p-6 sm:p-8">
                    <div className="grid lg:grid-cols-2 gap-10">

                      {/* Left — description + includes */}
                      <div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>{service.fullDesc}</p>
                        <h4 className="font-black text-[#0d1b2a] text-xs uppercase tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                          <div className="w-4 h-[2px] bg-[#159be3]" />
                          What's Included
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                          {service.includes.map((item) => (
                            <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600 font-semibold">
                              <div className="w-5 h-5 rounded-full bg-[#159be3]/10 flex items-center justify-center flex-shrink-0">
                                <BsCheck2 className="w-3 h-3 text-[#159be3]" />
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#159be3] to-[#0e7ab8] text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:shadow-xl hover:shadow-[#159be3]/30 transition-all group"
                        >
                          Book This Service
                          <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      {/* Right — gallery / video proof tabs */}
                      <div>
                        <div className="flex gap-3 mb-5">
                          <button
                            onClick={() => setProofTab('gallery')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                              proofTab === 'gallery'
                                ? 'bg-[#159be3] text-white shadow-md shadow-[#159be3]/30'
                                : 'bg-[#f0f9ff] text-[#159be3] border border-[#159be3]/20 hover:bg-[#159be3]/10'
                            }`}
                          >
                            <BsImages className="w-3.5 h-3.5" />
                            Before / After
                          </button>
                          {service.videoId && (
                            <button
                              onClick={() => setProofTab('video')}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                                proofTab === 'video'
                                  ? 'bg-[#159be3] text-white shadow-md shadow-[#159be3]/30'
                                  : 'bg-[#f0f9ff] text-[#159be3] border border-[#159be3]/20 hover:bg-[#159be3]/10'
                              }`}
                            >
                              <BsCameraVideo className="w-3.5 h-3.5" />
                              Video Proof
                            </button>
                          )}
                        </div>

                        {proofTab === 'gallery' && (
                          <ProjectGallery projects={service.projects} title={service.title} />
                        )}

                        {proofTab === 'video' && service.videoId && (
                          <div>
                            <VideoCard videoId={service.videoId} title={service.title} />
                            <div className="mt-3 bg-[#f0f9ff] rounded-2xl border border-[#159be3]/10 px-4 py-3 flex items-center gap-3">
                              <BsStarFill className="w-4 h-4 text-[#f6e5b7] flex-shrink-0" />
                              <p className="text-gray-500 text-xs font-semibold">Real recording from our team. Client details are blurred for privacy.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 relative overflow-hidden rounded-3xl" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 60%, #0d1b2a 100%)' }}>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }} />
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #f6e5b7, transparent)' }} />
          <div className="relative z-10 p-10 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#f6e5b7]" />
                <span className="text-[#f6e5b7] text-xs font-bold uppercase tracking-[0.25em]">Ready to Start?</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Book A Service{' '}
                <span style={{ background: 'linear-gradient(90deg, #159be3, #f6e5b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Today</span>
              </h3>
              <p className="text-white/45 text-sm mt-2 font-semibold max-w-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Contact our team to schedule an appointment or request a free quote for any of our services.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#159be3] to-[#0e7ab8] text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:shadow-2xl hover:shadow-[#159be3]/30 transition-all group"
              >
                Get a Quote
                <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+2348020776686"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#f6e5b7]/40 text-[#f6e5b7] font-black text-sm uppercase tracking-widest rounded-2xl hover:border-[#f6e5b7] hover:bg-[#f6e5b7]/10 transition-all"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <NewLetter />
    </div>
  );
};

export default Services;
