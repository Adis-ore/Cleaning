import React, { useState } from "react";
import { toast } from "react-toastify";
import { BsTrash3, BsSearch, BsGrid, BsListUl } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdOutlineInventory2 } from "react-icons/md";

const categoryColor = {
  laundry:  { bg: 'rgba(21,155,227,0.1)',  color: '#0369a1' },
  cleaning: { bg: 'rgba(13,159,110,0.1)',  color: '#0d9f6e' },
  machines: { bg: 'rgba(234,179,8,0.1)',   color: '#b45309' },
};

const List = ({ products, setProducts }) => {
  const [search, setSearch] = useState("");
  const [view,   setView]   = useState("table");

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p._id !== id));
    toast.success("Product removed.");
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '20px', height: '2px', background: '#159be3' }} />
          <span style={{ color: '#159be3', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Poppins, sans-serif' }}>Catalogue</span>
        </div>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '28px', fontWeight: 700, color: '#0d1b2a', textTransform: 'uppercase' }}>
          All Products
        </h1>
      </div>

      {/* Toolbar */}
      <div style={{ background: '#ffffff', borderRadius: '14px', padding: '16px 20px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <BsSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '13px', height: '13px', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 34px', border: '2px solid #f1f5f9', borderRadius: '10px', fontSize: '13px', fontWeight: 500, color: '#0d1b2a', fontFamily: 'Poppins, sans-serif', outline: 'none', background: '#f8fafc' }}
            onFocus={e => e.target.style.borderColor = '#159be3'}
            onBlur={e => e.target.style.borderColor = '#f1f5f9'}
          />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap' }}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </span>
        <div style={{ display: 'flex', border: '2px solid #f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
          {[['table', BsListUl], ['grid', BsGrid]].map(([v, Icon]) => (
            <button key={v} onClick={() => setView(v)} style={{ padding: '7px 12px', background: view === v ? '#0d1b2a' : '#ffffff', color: view === v ? '#ffffff' : '#9ca3af', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
              <Icon style={{ width: '14px', height: '14px' }} />
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <MdOutlineInventory2 style={{ width: '48px', height: '48px', color: '#e2e8f0', margin: '0 auto 12px' }} />
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, color: '#9ca3af' }}>No products found</p>
        </div>
      ) : view === 'table' ? (

        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 120px 80px', gap: '16px', padding: '12px 20px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
            {['Image', 'Name', 'Category', 'Price', 'Action'].map((h, i) => (
              <span key={h} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9ca3af', textAlign: i === 4 ? 'center' : 'left' }}>{h}</span>
            ))}
          </div>
          {filtered.map((item, index) => {
            const cat = categoryColor[item.category] || { bg: '#f1f5f9', color: '#6b7280' };
            return (
              <div key={item._id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 120px 80px', gap: '16px', padding: '14px 20px', borderBottom: index < filtered.length - 1 ? '1px solid #f8fafc' : 'none', alignItems: 'center', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <img src={item.image[0]} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #f1f5f9' }} />
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0d1b2a', lineHeight: 1.3 }}>{item.name}</p>
                  {item.bestseller && (
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#b45309', background: 'rgba(246,229,183,0.6)', padding: '2px 6px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Poppins, sans-serif', marginTop: '3px', display: 'inline-block' }}>Bestseller</span>
                  )}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'capitalize', padding: '3px 10px', borderRadius: '20px', background: cat.bg, color: cat.color, fontFamily: 'Poppins, sans-serif', display: 'inline-block' }}>{item.category}</span>
                <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '16px', fontWeight: 700, color: '#159be3', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <TbCurrencyNaira style={{ width: '14px', height: '14px' }} />
                  {item.price.toLocaleString()}
                </span>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={() => removeProduct(item._id)} style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.background = '#ffe4e6'; e.currentTarget.style.borderColor = '#fda4af'; }} onMouseLeave={e => { e.currentTarget.style.background = '#fff1f2'; e.currentTarget.style.borderColor = '#fecdd3'; }} title="Delete product">
                    <BsTrash3 style={{ width: '13px', height: '13px' }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      ) : (

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {filtered.map((item) => {
            const cat = categoryColor[item.category] || { bg: '#f1f5f9', color: '#6b7280' };
            return (
              <div key={item._id} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1', background: '#f8fafc', position: 'relative' }}>
                  <img src={item.image[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {item.bestseller && (
                    <span style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '9px', fontWeight: 700, color: '#b45309', background: '#f6e5b7', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Poppins, sans-serif' }}>Bestseller</span>
                  )}
                </div>
                <div style={{ padding: '14px' }}>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600, color: '#0d1b2a', marginBottom: '8px', lineHeight: 1.4 }}>{item.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'capitalize', padding: '2px 8px', borderRadius: '20px', background: cat.bg, color: cat.color, fontFamily: 'Poppins, sans-serif' }}>{item.category}</span>
                    <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '15px', fontWeight: 700, color: '#159be3', display: 'flex', alignItems: 'center' }}>
                      <TbCurrencyNaira style={{ width: '12px', height: '12px' }} />{item.price.toLocaleString()}
                    </span>
                  </div>
                  <button onClick={() => removeProduct(item._id)} style={{ width: '100%', padding: '8px', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', color: '#e11d48', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <BsTrash3 style={{ width: '12px', height: '12px' }} />Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default List;
