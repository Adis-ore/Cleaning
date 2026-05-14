import React, { useContext } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";

const Productitem = ({ id, name, price, image, category, bestseller }) => {
  const { addToCart } = useContext(Shopcontext);
  const navigate = useNavigate();

  return (
    <div
      className="group"
      onClick={() => navigate(`/product/${id}`)}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #f1f5f9',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: '#f8fafc' }}>
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div style={{ position: 'absolute', top: '6px', left: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {bestseller && (
            <span className="text-[8px] sm:text-[10px]" style={{ background: '#f6e5b7', color: '#7a5c00', fontWeight: 700, padding: '2px 6px', borderRadius: '20px', fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap' }}>
              Top Seller
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-2 sm:p-3" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3
          className="line-clamp-2 text-[10px] sm:text-[13px]"
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#0d1b2a', lineHeight: 1.35 }}
        >
          {name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1px', marginTop: 'auto' }}>
          <TbCurrencyNaira className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: '#159be3' }} />
          <span
            className="text-sm sm:text-xl"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#159be3', lineHeight: 1 }}
          >
            {price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={(e) => { e.stopPropagation(); addToCart(id); }}
        className="hover:bg-[#0e7ab8] active:scale-95 mx-1.5 sm:mx-3 mb-1.5 sm:mb-3 p-2 sm:p-3 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-xl"
        style={{
          background: '#159be3',
          color: '#ffffff',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        <BsCart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
        <span className="hidden sm:inline">Add to Cart</span>
      </button>
    </div>
  );
};

export default Productitem;
