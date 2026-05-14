import { TbCurrencyNaira } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { dummyProducts, dummyOrders } from "./dummyData";

export const currency = <TbCurrencyNaira style={{ display: 'inline', verticalAlign: 'middle' }} />;

const ADMIN_EMAIL    = 'admin@speedtouch.com';
const ADMIN_PASSWORD = 'admin123';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || ""
  );
  const [products, setProducts] = useState(dummyProducts);
  const [orders,   setOrders]   = useState(dummyOrders);

  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      {token === "" ? (
        <Login
          setToken={setToken}
          adminEmail={ADMIN_EMAIL}
          adminPassword={ADMIN_PASSWORD}
        />
      ) : (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <Navbar setToken={setToken} />
            <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
              <Routes>
                <Route path="/add"    element={<Add    products={products} setProducts={setProducts} />} />
                <Route path="/list"   element={<List   products={products} setProducts={setProducts} />} />
                <Route path="/orders" element={<Orders orders={orders}     setOrders={setOrders}     />} />
                <Route path="/"       element={<List   products={products} setProducts={setProducts} />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
