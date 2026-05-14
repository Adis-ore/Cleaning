import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { BsGridFill, BsListUl, BsMegaphone, BsFunnel, BsX } from 'react-icons/bs';
import { IoFilterOutline } from 'react-icons/io5';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { TbCurrencyNaira } from 'react-icons/tb';
import { RxCross2 } from 'react-icons/rx';
import Productitem from '../components/Productitem';
import SearchBar from '../components/SearchBar';

const categories = ['laundry', 'cleaning', 'machines'];
const subCategories = ['Laundry Supplies', 'Cleaning Agents', 'Tools & Equipment'];
const categoryLabels = { laundry: 'Laundry', cleaning: 'Cleaning', machines: 'Equipment' };

const priceRanges = [
  { label: 'All', value: 'all', min: 0, max: Infinity },
  { label: 'Under ₦2k', value: 'under-2k', min: 0, max: 2000 },
  { label: '₦2k–₦5k', value: '2k-5k', min: 2000, max: 5000 },
  { label: '₦5k–₦15k', value: '5k-15k', min: 5000, max: 15000 },
  { label: 'Above ₦15k', value: 'above-15k', min: 15000, max: Infinity },
];

const sortOptions = [
  { label: 'Relevant', value: 'relevant' },
  { label: 'Low → High', value: 'low-high' },
  { label: 'High → Low', value: 'high-low' },
  { label: 'New Arrivals', value: 'new' },
];

const Collection = () => {
  const { products, search, showSearch } = useContext(Shopcontext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (val) =>
    setCategory((prev) => (prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]));

  const toggleSubcategory = (val) =>
    setSubCategory((prev) => (prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]));

  const applyFilter = () => {
    let result = products.slice();
    if (showSearch && search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category.length > 0) result = result.filter((p) => category.includes(p.category));
    if (subcategory.length > 0) result = result.filter((p) => subcategory.includes(p.subCategory));
    if (priceRange !== 'all') {
      const range = priceRanges.find((r) => r.value === priceRange);
      if (range) result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }
    setFilterProduct(result);
  };

  const sortProduct = () => {
    const copy = filterProduct.slice();
    if (sortType === 'low-high') setFilterProduct(copy.sort((a, b) => a.price - b.price));
    else if (sortType === 'high-low') setFilterProduct(copy.sort((a, b) => b.price - a.price));
    else if (sortType === 'new') setFilterProduct(copy.reverse());
    else applyFilter();
  };

  useEffect(() => { applyFilter(); }, [category, subcategory, priceRange, search, showSearch, products]);
  useEffect(() => { sortProduct(); }, [sortType]);

  const clearFilters = () => { setCategory([]); setSubCategory([]); setPriceRange('all'); setSortType('relevant'); };
  const hasFilters = category.length > 0 || subcategory.length > 0 || priceRange !== 'all';
  const activeFilterCount = category.length + subcategory.length + (priceRange !== 'all' ? 1 : 0);

  /* ── Compact flat sidebar ── */
  const SectionLabel = ({ children }) => (
    <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '9px', fontWeight: 900, color: '#159be3', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '5px' }}>
      {children}
    </p>
  );

  const CheckRow = ({ label, active, onClick }) => (
    <button onClick={onClick} className="flex items-center gap-1.5 w-full group text-left">
      <div style={{
        width: '13px', height: '13px', borderRadius: '4px', flexShrink: 0, border: `2px solid ${active ? '#159be3' : '#d1d5db'}`,
        background: active ? '#159be3' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
      }}>
        {active && <svg viewBox="0 0 10 8" fill="none" style={{ width: '7px', height: '7px' }}><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span style={{ fontSize: '10px', fontWeight: 600, color: active ? '#0d1b2a' : '#6b7280', fontFamily: 'Poppins, sans-serif', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        className="group-hover:text-[#159be3] transition-colors truncate">
        {label}
      </span>
    </button>
  );

  const RadioRow = ({ label, active, onClick }) => (
    <button onClick={onClick} className="flex items-center gap-1.5 w-full group text-left">
      <div style={{
        width: '13px', height: '13px', borderRadius: '50%', flexShrink: 0, border: `2px solid ${active ? '#159be3' : '#d1d5db'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
      }}>
        {active && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#159be3' }} />}
      </div>
      <span style={{ fontSize: '10px', fontWeight: 600, color: active ? '#0d1b2a' : '#6b7280', fontFamily: 'Poppins, sans-serif', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        className="group-hover:text-[#159be3] transition-colors truncate">
        {label}
      </span>
    </button>
  );

  const Divider = () => <div style={{ height: '1px', background: '#e5e7eb', margin: '8px 0' }} />;

  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 60%, #0d1b2a 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #159be3, transparent)' }} />
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 py-10 sm:py-20 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 sm:w-6 h-[2px] bg-[#f6e5b7]" />
            <span className="text-[#f6e5b7] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">Our Products</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Cleaning{' '}
            <span style={{ background: 'linear-gradient(90deg, #159be3, #f6e5b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Supplies
            </span>
          </h1>
          <p className="text-white/50 text-xs sm:text-sm mt-3 max-w-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Professional-grade cleaning products trusted by homes, hotels, and businesses across Nigeria.
          </p>
        </div>
      </div>

      <SearchBar />

      <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 py-5 sm:py-12">

        {/* Mobile toolbar */}
        <div className="flex items-center gap-2 mb-4 lg:hidden">
          <button
            onClick={() => setShowFilter((v) => !v)}
            className="relative flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex-shrink-0"
            style={{
              background: showFilter ? '#159be3' : '#f0f9ff',
              color: showFilter ? '#ffffff' : '#0d1b2a',
              border: `2px solid ${showFilter ? '#159be3' : 'rgba(21,155,227,0.2)'}`,
            }}
          >
            {showFilter
              ? <BsX style={{ width: '14px', height: '14px' }} />
              : <BsFunnel style={{ width: '13px', height: '13px', color: '#159be3' }} />}
            <span style={{ color: showFilter ? '#fff' : '#0d1b2a' }}>Filter</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#f6e5b7] text-[#0d1b2a] text-[9px] font-black flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 bg-[#f0f9ff] rounded-xl px-3 py-2.5 border border-[#159be3]/10 flex-1 min-w-0">
            <BsGridFill className="w-3 h-3 text-[#159be3] flex-shrink-0" />
            <span className="text-[#0d1b2a] font-black text-xs truncate">
              {filterProduct.length} items{hasFilters ? ' ·  filtered' : ''}
            </span>
          </div>

          {hasFilters && (
            <button onClick={clearFilters} className="flex-shrink-0 text-[#159be3] text-[10px] font-black uppercase tracking-wider">
              Clear
            </button>
          )}
        </div>

        <div className="flex gap-3 sm:gap-6 lg:gap-10">

          {/* ── Sidebar ── */}
          <aside className={`flex-shrink-0 self-start sticky top-24 lg:w-56 xl:w-64 ${showFilter ? 'w-32 sm:w-44' : 'hidden'} lg:block`}>

            {/* Mobile: flat compact panel */}
            <div className="block lg:hidden rounded-2xl border border-[#159be3]/15 p-3" style={{ background: '#fafcff' }}>
              <SectionLabel>Category</SectionLabel>
              <div className="flex flex-col gap-1.5 mb-0">
                {categories.map((cat) => (
                  <CheckRow key={cat} label={categoryLabels[cat]} active={category.includes(cat)} onClick={() => toggleCategory(cat)} />
                ))}
              </div>
              <Divider />
              <SectionLabel>Type</SectionLabel>
              <div className="flex flex-col gap-1.5">
                {subCategories.map((sub) => (
                  <CheckRow key={sub} label={sub} active={subcategory.includes(sub)} onClick={() => toggleSubcategory(sub)} />
                ))}
              </div>
              <Divider />
              <SectionLabel>Price</SectionLabel>
              <div className="flex flex-col gap-1.5">
                {priceRanges.map((r) => (
                  <RadioRow key={r.value} label={r.label} active={priceRange === r.value} onClick={() => setPriceRange(r.value)} />
                ))}
              </div>
              <Divider />
              <SectionLabel>Sort</SectionLabel>
              <div className="flex flex-col gap-1.5">
                {sortOptions.map((o) => (
                  <RadioRow key={o.value} label={o.label} active={sortType === o.value} onClick={() => setSortType(o.value)} />
                ))}
              </div>
              {hasFilters && (
                <>
                  <Divider />
                  <button onClick={clearFilters} className="w-full py-1.5 text-[#159be3] font-black text-[9px] uppercase tracking-widest rounded-lg border border-[#159be3]/30 hover:bg-[#159be3] hover:text-white transition-colors">
                    Clear All
                  </button>
                </>
              )}
            </div>

            {/* Desktop: card sections */}
            <div className="hidden lg:flex flex-col gap-4">
              {[
                { title: 'Category', icon: IoFilterOutline, content: (
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleCategory(cat)}>
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${category.includes(cat) ? 'bg-[#159be3] border-[#159be3]' : 'border-gray-300 group-hover:border-[#159be3]'}`}>
                          {category.includes(cat) && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                        </div>
                        <span className="text-sm font-semibold text-gray-600 capitalize group-hover:text-[#159be3] transition-colors">{categoryLabels[cat]}</span>
                      </label>
                    ))}
                  </div>
                )},
                { title: 'Product Type', icon: BsListUl, content: (
                  <div className="space-y-2">
                    {subCategories.map((sub) => (
                      <label key={sub} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleSubcategory(sub)}>
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${subcategory.includes(sub) ? 'bg-[#159be3] border-[#159be3]' : 'border-gray-300 group-hover:border-[#159be3]'}`}>
                          {subcategory.includes(sub) && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                        </div>
                        <span className="text-sm font-semibold text-gray-600 group-hover:text-[#159be3] transition-colors">{sub}</span>
                      </label>
                    ))}
                  </div>
                )},
                { title: 'Price Range', icon: TbCurrencyNaira, content: (
                  <div className="space-y-2">
                    {priceRanges.map((r) => (
                      <label key={r.value} className="flex items-center gap-3 cursor-pointer group" onClick={() => setPriceRange(r.value)}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${priceRange === r.value ? 'border-[#159be3]' : 'border-gray-300 group-hover:border-[#159be3]'}`}>
                          {priceRange === r.value && <div className="w-2.5 h-2.5 rounded-full bg-[#159be3]" />}
                        </div>
                        <span className="text-sm font-semibold text-gray-600 group-hover:text-[#159be3] transition-colors">{r.label}</span>
                      </label>
                    ))}
                  </div>
                )},
                { title: 'Sort By', icon: BsGridFill, content: (
                  <div className="space-y-2">
                    {sortOptions.map((o) => (
                      <label key={o.value} className="flex items-center gap-3 cursor-pointer group" onClick={() => setSortType(o.value)}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${sortType === o.value ? 'border-[#159be3]' : 'border-gray-300 group-hover:border-[#159be3]'}`}>
                          {sortType === o.value && <div className="w-2.5 h-2.5 rounded-full bg-[#159be3]" />}
                        </div>
                        <span className="text-sm font-semibold text-gray-600 group-hover:text-[#159be3] transition-colors">{o.label}</span>
                      </label>
                    ))}
                  </div>
                )},
              ].map(({ title, icon: Icon, content }) => (
                <div key={title} className="bg-[#f0f9ff] rounded-3xl p-5 border border-[#159be3]/10">
                  <h3 className="font-black text-[#0d1b2a] text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#159be3]" />
                    {title}
                  </h3>
                  {content}
                </div>
              ))}

              {/* Ad Space */}
              <div className="rounded-3xl overflow-hidden border-2 border-dashed border-[#159be3]/30" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e8f5fd 100%)' }}>
                <div className="p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-[#159be3]/15 flex items-center justify-center mx-auto mb-3">
                    <BsMegaphone className="w-5 h-5 text-[#159be3]" />
                  </div>
                  <p className="text-[#0d1b2a] font-black text-xs uppercase tracking-widest mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>Ad Space</p>
                  <p className="text-gray-400 text-xs font-semibold leading-relaxed">Promotions & offers will appear here</p>
                </div>
              </div>

              {hasFilters && (
                <button onClick={clearFilters} className="w-full py-3 border-2 border-[#159be3] text-[#159be3] font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#159be3] hover:text-white transition-colors">
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Desktop toolbar */}
            <div className="hidden lg:flex items-center gap-3 mb-8 bg-[#f0f9ff] rounded-2xl px-5 py-4 border border-[#159be3]/10">
              <BsGridFill className="w-4 h-4 text-[#159be3]" />
              <span className="text-[#0d1b2a] font-black text-sm">
                {filterProduct.length} Product{filterProduct.length !== 1 ? 's' : ''}
              </span>
              {hasFilters && <span className="text-[#159be3] text-xs font-semibold">(filtered)</span>}
            </div>

            {filterProduct.length > 0 ? (
              <div className={`grid gap-2.5 sm:gap-5 ${showFilter ? 'grid-cols-2' : 'grid-cols-3'} sm:grid-cols-3 xl:grid-cols-4`}>
                {filterProduct.map((item, index) => (
                  <Productitem
                    key={index}
                    name={item.name}
                    id={item._id}
                    image={item.image}
                    price={item.price}
                    bestseller={item.bestseller}
                    category={item.category}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-3xl bg-[#159be3]/10 flex items-center justify-center mb-5">
                  <MdOutlineCleaningServices className="w-8 sm:w-10 h-8 sm:h-10 text-[#159be3]/40" />
                </div>
                <p className="text-[#0d1b2a] font-black text-sm sm:text-base uppercase mb-2">No Products Found</p>
                <p className="text-gray-400 font-semibold text-xs sm:text-sm mb-5">Try adjusting your filters</p>
                <button onClick={clearFilters} className="px-5 py-2.5 bg-[#159be3] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#0e7ab8] transition-colors">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
