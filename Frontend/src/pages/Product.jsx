import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shopcontext } from '../context/Shopcontext';
import RelatedProduct from '../components/RelatedProduct';
import { TbCurrencyNaira } from 'react-icons/tb';
import { BsArrowRight, BsCartPlus, BsShieldCheck, BsTruck, BsStarFill, BsStar, BsBoxSeam } from 'react-icons/bs';
import { MdOutlineVerified, MdOutlineLocalShipping } from 'react-icons/md';
import { RiLeafLine } from 'react-icons/ri';
import axios from 'axios';
import { toast } from 'react-toastify';

const StarRating = ({ value, onChange }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange && onChange(star)}
        style={{ color: star <= value ? '#f6e5b7' : '#d1d5db', background: 'none', border: 'none', cursor: onChange ? 'pointer' : 'default', padding: '2px' }}
      >
        <BsStarFill className="w-4 h-4" />
      </button>
    ))}
  </div>
);

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, backendUrl, token, navigate, setBuyNowItem } = useContext(Shopcontext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image[0]);
    }
  }, [productId, products]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/review/${productId}`);
      if (data.success) {
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
        setReviewCount(data.count);
      }
    } catch (_) {}
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) return toast.error('Please log in to leave a review');
    if (!newComment.trim()) return toast.error('Please write a comment');
    setSubmitting(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/review/add`,
        { productId, rating: newRating, comment: newComment },
        { headers: { token } }
      );
      if (data.success) {
        toast.success('Review submitted!');
        setNewComment('');
        setNewRating(5);
        fetchReviews();
      } else {
        toast.error(data.message);
      }
    } catch (_) {
      toast.error('Failed to submit review');
    }
    setSubmitting(false);
  };

  const handleAddToCart = () => {
    addToCart(productData._id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!token) {
      toast.error('Please log in to continue');
      navigate('/login');
      return;
    }
    setBuyNowItem({ ...productData, amount: 1 });
    navigate('/place-order');
  };

  if (!productData) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-[#f0f9ff] border-b border-[#159be3]/10 px-5 sm:px-8 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-gray-400">
          <Link to="/" className="hover:text-[#159be3] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-[#159be3] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#159be3] capitalize">{productData.category}</span>
          <span>/</span>
          <span className="text-[#0d1b2a] font-bold truncate max-w-xs">{productData.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Image gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              {productData.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImage(img)}
                  className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${
                    image === img ? 'border-[#159be3] shadow-lg shadow-[#159be3]/20' : 'border-gray-100 hover:border-[#159be3]/40'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 rounded-3xl overflow-hidden bg-[#f0f9ff] border border-[#159be3]/10 relative group">
              <img
                src={image}
                alt={productData.name}
                className="w-full h-80 sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {productData.bestseller && (
                <div className="absolute top-4 left-4 bg-[#f6e5b7] text-[#0d1b2a] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                  Top Seller
                </div>
              )}
              <div className="absolute top-4 right-4 bg-[#159be3] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg capitalize">
                {productData.category}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <BsStarFill key={i} className="w-3.5 h-3.5 text-[#f6e5b7]" />
                ))}
              </div>
              <span className="text-gray-400 text-sm font-semibold">
              {reviewCount > 0 ? `(${avgRating} · ${reviewCount} review${reviewCount !== 1 ? 's' : ''})` : 'No reviews yet'}
            </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#0d1b2a] uppercase leading-tight mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {productData.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="flex items-center text-[#159be3] font-black text-4xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
                <TbCurrencyNaira className="w-8 h-8" />
                {productData.price.toLocaleString()}
              </span>
              <span className="text-gray-400 text-sm font-semibold line-through">
                {(productData.price * 1.15).toLocaleString()}
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">-15%</span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {productData.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1.5 bg-[#159be3]/8 text-[#159be3] rounded-xl text-xs font-bold border border-[#159be3]/20 capitalize">
                {productData.category}
              </span>
              <span className="px-3 py-1.5 bg-[#159be3]/8 text-[#159be3] rounded-xl text-xs font-bold border border-[#159be3]/20">
                {productData.subCategory}
              </span>
              {productData.bestseller && (
                <span className="px-3 py-1.5 bg-[#f6e5b7]/20 text-[#0d1b2a] rounded-xl text-xs font-bold border border-[#f6e5b7]">
                  Top Seller
                </span>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 py-4 font-black text-sm uppercase tracking-widest rounded-2xl transition-all duration-300 group ${
                  added
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gradient-to-r from-[#159be3] to-[#0e7ab8] text-white shadow-lg shadow-[#159be3]/30 hover:shadow-xl hover:shadow-[#159be3]/40 hover:-translate-y-0.5'
                }`}
              >
                <BsCartPlus className="w-5 h-5" />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#0d1b2a] text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-[#1a3a5c] transition-colors group"
              >
                Buy Now
                <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust strips */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BsShieldCheck, text: '100% Genuine Product' },
                { icon: MdOutlineLocalShipping, text: 'Fast Nationwide Delivery' },
                { icon: RiLeafLine, text: 'Eco-Safe Ingredients' },
                { icon: BsBoxSeam, text: '7-Day Return Policy' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-[#f0f9ff] rounded-2xl px-4 py-3 border border-[#159be3]/10">
                  <Icon className="w-4 h-4 text-[#159be3] flex-shrink-0" />
                  <span className="text-gray-600 text-xs font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20">
          <div className="border-b border-gray-100 mb-8 flex gap-2">
            {['description', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 border-b-2 font-black text-sm uppercase tracking-widest mr-6 transition-colors ${
                  activeTab === tab
                    ? 'border-[#159be3] text-[#159be3]'
                    : 'border-transparent text-gray-400 hover:text-[#159be3]'
                }`}
              >
                {tab === 'description' ? 'Description' : `Reviews (${reviewCount})`}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-black text-[#0d1b2a] text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Product Details
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{productData.description}</p>
                <div className="space-y-3 mb-8">
                  {[
                    'Professional-grade formula',
                    'Safe for all surfaces',
                    'Long-lasting effectiveness',
                    'Trusted by homes and businesses across Nigeria',
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3 text-sm text-gray-600 font-semibold">
                      <div className="w-5 h-5 rounded-full bg-[#159be3]/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#159be3]" />
                      </div>
                      {point}
                    </div>
                  ))}
                </div>

                {productData.application && productData.application.length > 0 && (
                  <div style={{ background: '#f0f9ff', borderRadius: '16px', padding: '20px 24px', border: '1px solid rgba(21,155,227,0.15)' }}>
                    <h4 className="font-black text-[#0d1b2a] text-xs uppercase tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      <div style={{ width: '16px', height: '2px', background: '#159be3' }} />
                      How to Apply
                    </h4>
                    <ol className="space-y-3">
                      {productData.application.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-semibold">
                          <span style={{
                            minWidth: '24px', height: '24px', borderRadius: '50%',
                            background: '#159be3', color: '#ffffff',
                            fontFamily: 'Oswald, sans-serif', fontSize: '12px', fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                          }}>
                            {i + 1}
                          </span>
                          <span style={{ fontFamily: 'Poppins, sans-serif', color: '#4b5563', lineHeight: 1.6 }}>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
              <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1a3a5c] rounded-3xl p-8">
                <h3 className="font-black text-white text-sm uppercase tracking-widest mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Why Choose Speed Touch?
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: MdOutlineVerified, text: 'Certified cleaning professionals' },
                    { icon: BsTruck, text: 'Delivery across all 36 states' },
                    { icon: RiLeafLine, text: 'Eco-friendly product range' },
                    { icon: BsShieldCheck, text: 'Quality assured on every order' },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/70 font-semibold">
                      <Icon className="w-5 h-5 text-[#159be3] flex-shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Review list */}
              <div>
                {reviews.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
                    No reviews yet. Be the first to review this product.
                  </div>
                ) : (
                  <div className="space-y-5">
                    {reviews.map((r) => (
                      <div key={r._id} style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9' }}>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14px', color: '#0d1b2a' }}>{r.name}</p>
                            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px', fontFamily: 'Poppins, sans-serif' }}>
                              {new Date(r.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                          <StarRating value={r.rating} />
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.6, fontFamily: 'Poppins, sans-serif' }}>{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Review form */}
              <div>
                <h3 className="font-black text-[#0d1b2a] text-sm uppercase tracking-widest mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Leave a Review
                </h3>
                {token ? (
                  <form onSubmit={submitReview} className="space-y-5">
                    <div>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700, color: '#0d1b2a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Your Rating
                      </p>
                      <StarRating value={newRating} onChange={setNewRating} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 700, color: '#0d1b2a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Your Review
                      </p>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your experience with this product..."
                        rows={4}
                        style={{
                          width: '100%', padding: '14px 16px',
                          border: '1.5px solid #e2e8f0', borderRadius: '14px',
                          fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#0d1b2a',
                          resize: 'vertical', outline: 'none',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#159be3')}
                        onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        padding: '14px 32px', background: submitting ? '#9ca3af' : '#159be3',
                        color: '#ffffff', border: 'none', borderRadius: '14px',
                        fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                        fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em',
                        cursor: submitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
                      }}
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                ) : (
                  <div style={{ background: '#f0f9ff', borderRadius: '16px', padding: '28px', textAlign: 'center', border: '1px solid rgba(21,155,227,0.15)' }}>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#4b5563', marginBottom: '16px' }}>
                      You need to be logged in to leave a review.
                    </p>
                    <Link
                      to="/login"
                      style={{
                        display: 'inline-block', padding: '12px 28px', background: '#159be3',
                        color: '#ffffff', borderRadius: '12px', fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700, fontSize: '12px', textTransform: 'uppercase',
                        letterSpacing: '0.1em', textDecoration: 'none',
                      }}
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
