import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Productitem from './Productitem';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(Shopcontext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products
        .filter((item) => item.category === category && item.subCategory === subCategory)
        .slice(0, 4);
      setRelated(filtered);
    }
  }, [products, category, subCategory]);

  if (related.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)' }}>

      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #159be3, transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#159be3]/10 px-4 py-2 rounded-full mb-4">
              <div className="w-2 h-2 rounded-full bg-[#159be3]" />
              <span className="text-[#159be3] text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: 'Poppins, sans-serif' }}>You May Also Like</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0d1b2a] uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Related{' '}
              <span style={{ background: 'linear-gradient(90deg, #159be3, #0e7ab8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Products
              </span>
            </h2>
          </div>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-[#159be3] font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all group"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            View All
            <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {related.map((item, index) => (
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
      </div>
    </section>
  );
};

export default RelatedProduct;
