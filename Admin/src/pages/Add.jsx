import React, { useState } from "react";
import { toast } from "react-toastify";
import { BsCloudUpload, BsX, BsCheckCircleFill } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";

const inputStyle = {
  width: '100%', padding: '11px 14px',
  border: '2px solid #f1f5f9', borderRadius: '10px',
  fontSize: '13px', fontWeight: 500, color: '#0d1b2a',
  background: '#ffffff', fontFamily: 'Poppins, sans-serif',
  outline: 'none', transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block', fontSize: '10px', fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.15em',
  color: '#0d1b2a', marginBottom: '6px', fontFamily: 'Poppins, sans-serif',
};

const ImageSlot = ({ id, file, setFile }) => (
  <label
    htmlFor={id}
    style={{
      width: '100px', height: '100px',
      border: `2px dashed ${file ? '#159be3' : '#e2e8f0'}`,
      borderRadius: '12px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', background: file ? 'rgba(21,155,227,0.05)' : '#f8fafc',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
      transition: 'border-color 0.2s, background 0.2s',
    }}
  >
    {file ? (
      <>
        <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setFile(false); }}
          style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: '#ef4444', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <BsX style={{ width: '12px', height: '12px' }} />
        </button>
      </>
    ) : (
      <>
        <BsCloudUpload style={{ width: '22px', height: '22px', color: '#94a3b8', marginBottom: '4px' }} />
        <span style={{ fontSize: '9px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Poppins, sans-serif' }}>Upload</span>
      </>
    )}
    <input type="file" id={id} hidden onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
  </label>
);

const Add = ({ products, setProducts }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name,        setName]        = useState("");
  const [description, setDescription] = useState("");
  const [category,    setCategory]    = useState("laundry");
  const [price,       setPrice]       = useState("");
  const [subCategory, setSubCategory] = useState("Laundry Supplies");
  const [bestseller,  setBestseller]  = useState(false);
  const [loading,     setLoading]     = useState(false);

  const reset = () => {
    setName(""); setDescription(""); setCategory("laundry"); setPrice("");
    setSubCategory("Laundry Supplies"); setBestseller(false);
    setImage1(false); setImage2(false); setImage3(false); setImage4(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const images = [image1, image2, image3, image4]
      .filter(Boolean)
      .map(f => URL.createObjectURL(f));

    if (images.length === 0) {
      toast.error("Please upload at least one product image.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const newProduct = {
        _id: 'p' + Date.now(),
        name,
        description,
        category,
        subCategory,
        price: Number(price),
        bestseller,
        image: images,
      };
      setProducts(prev => [newProduct, ...prev]);
      toast.success(`"${name}" added successfully!`);
      reset();
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '20px', height: '2px', background: '#159be3' }} />
          <span style={{ color: '#159be3', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Poppins, sans-serif' }}>Catalogue</span>
        </div>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '28px', fontWeight: 700, color: '#0d1b2a', textTransform: 'uppercase' }}>
          Add New Product
        </h1>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Images card */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '14px', fontWeight: 700, color: '#0d1b2a', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MdOutlineInventory2 style={{ color: '#159be3', width: '18px', height: '18px' }} />
              Product Images
            </h3>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'Poppins, sans-serif', marginBottom: '16px' }}>
              Upload up to 4 product images. First image is the main display image.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <ImageSlot id="image1" file={image1} setFile={setImage1} />
              <ImageSlot id="image2" file={image2} setFile={setImage2} />
              <ImageSlot id="image3" file={image3} setFile={setImage3} />
              <ImageSlot id="image4" file={image4} setFile={setImage4} />
            </div>
          </div>

          {/* Details card */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '14px', fontWeight: 700, color: '#0d1b2a', textTransform: 'uppercase', marginBottom: '20px' }}>
              Product Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div>
                <label style={labelStyle}>Product Name</label>
                <input type="text" placeholder="e.g. Premium Laundry Detergent 5kg" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = '#159be3'} onBlur={e => e.target.style.borderColor = '#f1f5f9'} />
              </div>

              <div>
                <label style={labelStyle}>Product Description</label>
                <textarea placeholder="Describe the product — ingredients, use cases, volume..." required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} onFocus={e => e.target.style.borderColor = '#159be3'} onBlur={e => e.target.style.borderColor = '#f1f5f9'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = '#159be3'} onBlur={e => e.target.style.borderColor = '#f1f5f9'}>
                    <option value="laundry">Laundry</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="machines">Machines</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Sub-Category</label>
                  <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = '#159be3'} onBlur={e => e.target.style.borderColor = '#f1f5f9'}>
                    <option value="Laundry Supplies">Laundry Supplies</option>
                    <option value="Cleaning Agents">Cleaning Agents</option>
                    <option value="Tools & Equipment">Tools & Equipment</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Price (₦)</label>
                  <div style={{ position: 'relative' }}>
                    <TbCurrencyNaira style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#9ca3af' }} />
                    <input type="number" placeholder="0" required min="0" value={price} onChange={(e) => setPrice(e.target.value)} style={{ ...inputStyle, paddingLeft: '32px' }} onFocus={e => e.target.style.borderColor = '#159be3'} onBlur={e => e.target.style.borderColor = '#f1f5f9'} />
                  </div>
                </div>
              </div>

              <div onClick={() => setBestseller(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', border: `2px solid ${bestseller ? '#159be3' : '#f1f5f9'}`, borderRadius: '10px', background: bestseller ? 'rgba(21,155,227,0.05)' : '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: `2px solid ${bestseller ? '#159be3' : '#d1d5db'}`, background: bestseller ? '#159be3' : '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                  {bestseller && <BsCheckCircleFill style={{ width: '12px', height: '12px', color: '#ffffff' }} />}
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0d1b2a' }}>Mark as Bestseller</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#9ca3af' }}>This product will show a bestseller badge in the shop</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={reset} style={{ padding: '12px 24px', border: '2px solid #f1f5f9', borderRadius: '10px', background: '#ffffff', color: '#6b7280', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
              Clear Form
            </button>
            <button type="submit" disabled={loading} style={{ padding: '12px 32px', background: loading ? '#93c5fd' : '#159be3', border: 'none', borderRadius: '10px', color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
