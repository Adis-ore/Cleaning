import React, { useContext, useEffect, useRef, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { MdOutlineCleaningServices } from 'react-icons/md';

const suggestions = ['Floor Cleaner', 'Disinfectant', 'Laundry Detergent', 'Vacuum', 'Mop', 'Sanitizer'];

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(Shopcontext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  useEffect(() => {
    if (showSearch && visible && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showSearch, visible]);

  if (!showSearch || !visible) return null;

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setShowSearch(false)}
      />

      {/* Search panel */}
      <div className="relative z-10 bg-white border-b border-gray-100 shadow-xl">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-6">

          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <MdOutlineCleaningServices className="w-4 h-4 text-[#159be3]" />
            <span className="text-[#159be3] text-xs font-bold uppercase tracking-widest">Search Products</span>
          </div>

          {/* Input */}
          <div className="flex items-center gap-4 bg-[#f0f9ff] border-2 border-[#159be3]/30 rounded-2xl px-5 py-3 focus-within:border-[#159be3] transition-colors">
            <AiOutlineSearch className="w-5 h-5 text-[#159be3] flex-shrink-0" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#0d1b2a] font-semibold text-base placeholder:text-gray-400"
              type="text"
              placeholder="Search cleaning supplies, detergents, equipment..."
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-gray-400 hover:text-[#159be3] transition-colors"
              >
                <RxCross2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Suggestions */}
          {!search && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Popular:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSearch(s)}
                  className="px-3 py-1.5 bg-[#159be3]/8 text-[#159be3] rounded-xl text-xs font-semibold hover:bg-[#159be3] hover:text-white transition-colors border border-[#159be3]/20"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Close hint */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-400 text-xs font-semibold">Searching in all cleaning products</p>
            <button
              onClick={() => setShowSearch(false)}
              className="flex items-center gap-1.5 text-gray-400 hover:text-[#159be3] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <RxCross2 className="w-3.5 h-3.5" />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
