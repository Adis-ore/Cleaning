import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { BsChevronDown, BsGridFill, BsListUl, BsSearch } from 'react-icons/bs';
import { IoFilterOutline } from 'react-icons/io5';
import { MdOutlineCleaningServices, MdTune } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import Productitem from '../components/Productitem';
import SearchBar from '../components/SearchBar';

const categories = ['laundry', 'cleaning', 'machines'];
const subCategories = ['Laundry Supplies', 'Cleaning Agents', 'Tools & Equipment'];

const categoryLabels = {
  laundry: 'Laundry',
  cleaning: 'Cleaning',
  machines: 'Equipment',
};

const Collection = () => {
  const { products, search, showSearch } = useContext(Shopcontext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
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
    setFilterProduct(result);
  };

  const sortProduct = () => {
    const copy = filterProduct.slice();
    if (sortType === 'low-high') setFilterProduct(copy.sort((a, b) => a.price - b.price));
    else if (sortType === 'high-low') setFilterProduct(copy.sort((a, b) => b.price - a.price));
    else applyFilter();
  };

  useEffect(() => { applyFilter(); }, [category, subcategory, search, showSearch, products]);
  useEffect(() => { sortProduct(); }, [sortType]);

  const clearFilters = () => { setCategory([]); setSubCategory([]); setSortType('relevant'); };
  const hasFilters = category.length > 0 || subcategory.length > 0;

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
            <span className="text-[#f6e5b7] text-xs font-bold uppercase tracking-[0.25em]">Our Products</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Cleaning{' '}
            <span style={{ background: 'linear-gradient(90deg, #159be3, #f6e5b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Supplies
            </span>
          </h1>
          <p className="text-white/50 text-sm mt-4 max-w-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Professional-grade cleaning products trusted by homes, hotels, and businesses across Nigeria.
          </p>

          {/* Active filter pills */}
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-6">
              {category.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 bg-[#159be3] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {categoryLabels[c] || c}
                  <button onClick={() => toggleCategory(c)}><RxCross2 className="w-3 h-3" /></button>
                </span>
              ))}
              {subcategory.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {s}
                  <button onClick={() => toggleSubcategory(s)}><RxCross2 className="w-3 h-3" /></button>
                </span>
              ))}
              <button onClick={clearFilters} className="text-white/60 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      <SearchBar />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="lg:w-60 flex-shrink-0">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="lg:hidden w-full flex items-center justify-between px-5 py-4 bg-[#f0f9ff] border border-[#159be3]/20 rounded-2xl text-[#0d1b2a] font-black text-sm uppercase tracking-widest mb-4"
            >
              <span className="flex items-center gap-2">
                <MdTune className="w-5 h-5 text-[#159be3]" />
                Filter Products
              </span>
              <BsChevronDown className={`w-4 h-4 transition-transform text-[#159be3] ${showFilter ? 'rotate-180' : ''}`} />
            </button>

            <div className={`space-y-6 ${showFilter ? 'block' : 'hidden lg:block'}`}>

              {/* Category filter */}
              <div className="bg-[#f0f9ff] rounded-3xl p-5 border border-[#159be3]/10">
                <h3 className="font-black text-[#0d1b2a] text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <IoFilterOutline className="w-4 h-4 text-[#159be3]" />
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleCategory(cat)}>
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                        category.includes(cat) ? 'bg-[#159be3] border-[#159be3] shadow-md shadow-[#159be3]/30' : 'border-gray-300 group-hover:border-[#159be3]'
                      }`}>
                        {category.includes(cat) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-600 capitalize group-hover:text-[#159be3] transition-colors">
                        {categoryLabels[cat] || cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategory filter */}
              <div className="bg-[#f0f9ff] rounded-3xl p-5 border border-[#159be3]/10">
                <h3 className="font-black text-[#0d1b2a] text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <BsListUl className="w-4 h-4 text-[#159be3]" />
                  Product Type
                </h3>
                <div className="space-y-2">
                  {subCategories.map((sub) => (
                    <label key={sub} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleSubcategory(sub)}>
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                        subcategory.includes(sub) ? 'bg-[#159be3] border-[#159be3] shadow-md shadow-[#159be3]/30' : 'border-gray-300 group-hover:border-[#159be3]'
                      }`}>
                        {subcategory.includes(sub) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-600 group-hover:text-[#159be3] transition-colors">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-3 border-2 border-[#159be3] text-[#159be3] font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#159be3] hover:text-white transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#f0f9ff] rounded-2xl px-5 py-4 border border-[#159be3]/10">
              <div className="flex items-center gap-3">
                <BsGridFill className="w-4 h-4 text-[#159be3]" />
                <span className="text-[#0d1b2a] font-black text-sm">
                  {filterProduct.length} Product{filterProduct.length !== 1 ? 's' : ''}
                </span>
                {hasFilters && (
                  <span className="text-[#159be3] text-xs font-semibold">(filtered)</span>
                )}
              </div>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="border-2 border-[#159be3]/20 rounded-xl text-sm px-4 py-2 font-semibold text-[#0d1b2a] focus:outline-none focus:border-[#159be3] bg-white cursor-pointer"
              >
                <option value="relevant">Sort: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {filterProduct.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
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
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-3xl bg-[#159be3]/10 flex items-center justify-center mb-6">
                  <MdOutlineCleaningServices className="w-10 h-10 text-[#159be3]/40" />
                </div>
                <p className="text-[#0d1b2a] font-black text-base uppercase mb-2">No Products Found</p>
                <p className="text-gray-400 font-semibold text-sm mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#159be3] text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-[#0e7ab8] transition-colors"
                >
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
