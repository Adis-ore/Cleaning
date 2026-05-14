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
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #f1f5f9',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        display: 'flex', flexDirection: 'column',
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
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {bestseller && (
            <span style={{ background: '#f6e5b7', color: '#7a5c00', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', fontFamily: 'Poppins, sans-serif' }}>
              Top Seller
            </span>
          )}
          {category && (
            <span style={{ background: '#ffffff', color: '#159be3', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize' }}>
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 className="line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0d1b2a', lineHeight: 1.4 }}>
          {name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: 'auto' }}>
          <TbCurrencyNaira style={{ width: '16px', height: '16px', color: '#159be3', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '20px', fontWeight: 700, color: '#159be3' }}>
            {price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={(e) => { e.stopPropagation(); addToCart(id); }}
        style={{
          margin: '0 12px 12px',
          padding: '12px',
          background: '#159be3',
          color: '#ffffff',
          borderRadius: '12px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        className="hover:bg-[#0e7ab8] active:scale-95"
      >
        <BsCart3 className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
};

export default Productitem;
