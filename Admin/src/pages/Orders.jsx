import React, { useState } from "react";
import { BsBoxSeam, BsGeoAlt, BsTelephone, BsSearch } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";

const statusConfig = {
  "Order Placed":     { bg: 'rgba(21,155,227,0.1)',  color: '#0369a1', dot: '#159be3'  },
  "Packing":          { bg: 'rgba(234,179,8,0.1)',   color: '#b45309', dot: '#eab308'  },
  "Shipped":          { bg: 'rgba(99,102,241,0.1)',  color: '#4338ca', dot: '#6366f1'  },
  "Out for delivery": { bg: 'rgba(249,115,22,0.1)',  color: '#c2410c', dot: '#f97316'  },
  "Delivered":        { bg: 'rgba(13,159,110,0.1)',  color: '#065f46', dot: '#0d9f6e'  },
};

const allStatuses = ["All", "Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"];

const Orders = ({ orders, setOrders }) => {
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const statusHandler = (newStatus, orderId) => {
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
  };

  const filtered = orders.filter(o => {
    const matchesStatus = filterStatus === "All" || o.status === filterStatus;
    const name = `${o.address.firstName} ${o.address.lastName}`.toLowerCase();
    const matchesSearch = search === "" || name.includes(search.toLowerCase()) || o.address.phone.includes(search);
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '20px', height: '2px', background: '#159be3' }} />
          <span style={{ color: '#159be3', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Poppins, sans-serif' }}>Operations</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '28px', fontWeight: 700, color: '#0d1b2a', textTransform: 'uppercase' }}>Orders</h1>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>
            {filtered.length} order{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ background: '#ffffff', borderRadius: '14px', padding: '16px 20px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <BsSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '13px', height: '13px', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search by customer name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 34px', border: '2px solid #f1f5f9', borderRadius: '10px', fontSize: '13px', fontWeight: 500, color: '#0d1b2a', fontFamily: 'Poppins, sans-serif', outline: 'none', background: '#f8fafc' }}
            onFocus={e => e.target.style.borderColor = '#159be3'}
            onBlur={e => e.target.style.borderColor = '#f1f5f9'}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {allStatuses.map(s => {
            const cfg = statusConfig[s];
            const isActive = filterStatus === s;
            return (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '5px 12px', borderRadius: '20px', border: `2px solid ${isActive ? (cfg?.dot || '#0d1b2a') : '#f1f5f9'}`, background: isActive ? (cfg?.bg || '#0d1b2a') : '#ffffff', color: isActive ? (cfg?.color || '#ffffff') : '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <BsBoxSeam style={{ width: '48px', height: '48px', color: '#e2e8f0', margin: '0 auto 12px' }} />
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, color: '#9ca3af' }}>No orders found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((order) => {
            const cfg = statusConfig[order.status] || statusConfig["Order Placed"];
            return (
              <div key={order._id} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${cfg.dot}, transparent)` }} />
                <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'start' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>

                    {/* Items */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <BsBoxSeam style={{ width: '14px', height: '14px', color: '#159be3', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9ca3af' }}>Items</span>
                      </div>
                      {order.items.map((item, i) => (
                        <p key={i} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600, color: '#0d1b2a', marginBottom: '2px' }}>
                          {item.name} <span style={{ color: '#9ca3af', fontWeight: 500 }}>× {item.amount}</span>
                        </p>
                      ))}
                    </div>

                    {/* Customer */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <BsGeoAlt style={{ width: '14px', height: '14px', color: '#159be3', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9ca3af' }}>Customer</span>
                      </div>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 700, color: '#0d1b2a', marginBottom: '4px' }}>
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#6b7280', lineHeight: 1.5 }}>
                        {order.address.street},<br />{order.address.city}, {order.address.state}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px' }}>
                        <BsTelephone style={{ width: '11px', height: '11px', color: '#9ca3af' }} />
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#6b7280' }}>{order.address.phone}</span>
                      </div>
                    </div>

                    {/* Payment */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <MdOutlinePayment style={{ width: '14px', height: '14px', color: '#159be3', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9ca3af' }}>Payment</span>
                      </div>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600, color: '#0d1b2a', marginBottom: '6px' }}>{order.paymentMethod}</p>
                      <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, padding: '2px 10px', borderRadius: '20px', background: order.payment ? 'rgba(13,159,110,0.1)' : 'rgba(234,179,8,0.1)', color: order.payment ? '#065f46' : '#b45309', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {order.payment ? 'Paid' : 'Pending'}
                      </span>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>
                        {new Date(order.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Right: total + status */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#9ca3af', marginBottom: '2px' }}>Total</p>
                      <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '22px', fontWeight: 700, color: '#159be3', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <TbCurrencyNaira style={{ width: '18px', height: '18px' }} />
                        {order.amount.toLocaleString()}
                      </p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) => statusHandler(e.target.value, order._id)}
                      style={{ padding: '8px 12px', border: `2px solid ${cfg.dot}`, borderRadius: '10px', background: cfg.bg, color: cfg.color, fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700, cursor: 'pointer', outline: 'none', minWidth: '160px' }}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
