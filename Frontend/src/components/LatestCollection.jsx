import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import Productitem from './Productitem';

const LatestCollection = () => {
  const { products } = useContext(Shopcontext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <section style={{ padding: '96px 0', background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: '56px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '24px', height: '2px', background: '#159be3' }} />
              <span style={{ color: '#159be3', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', fontFamily: 'Poppins, sans-serif' }}>Now In Stock</span>
            </div>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: '#0d1b2a', textTransform: 'uppercase', lineHeight: 1.1 }}>
              Featured <span style={{ color: '#159be3' }}>Products</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '12px', maxWidth: '460px', lineHeight: 1.7, fontFamily: 'Poppins, sans-serif' }}>
              Professional-grade cleaning supplies, detergents, and equipment trusted by homes and businesses across Nigeria.
            </p>
          </div>
          <Link
            to="/collection"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              color: '#159be3', fontSize: '12px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.15em',
              textDecoration: 'none', fontFamily: 'Poppins, sans-serif',
              transition: 'gap 0.2s',
            }}
            className="group hover:gap-5"
          >
            View All Products
            <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        {latestProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {latestProducts.map((item, index) => (
              <Productitem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                bestseller={item.bestseller}
                category={item.category}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Loading products...
          </div>
        )}

        {/* Bulk CTA */}
        <div style={{
          marginTop: '56px',
          background: '#0d1b2a',
          borderRadius: '20px',
          padding: '36px 40px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
        }}>
          <div>
            <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '20px', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', marginBottom: '4px' }}>
              Need Bulk Orders?
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>
              Special pricing for businesses, hotels, and institutions
            </p>
          </div>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 28px',
              background: '#159be3', color: '#ffffff',
              fontFamily: 'Poppins, sans-serif', fontWeight: 700,
              fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em',
              textDecoration: 'none', borderRadius: '12px',
              flexShrink: 0,
            }}
            className="group hover:bg-[#0e7ab8] transition-colors"
          >
            Request a Quote
            <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
