import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id }    = useParams();
  const [product, setProduct] = useState(null);
  const [qty,     setQty]     = useState(1);
  const { addToCart } = useCart();
  const navigate      = useNavigate();
  const API           = 'https://waleedvetcare-backend-production.up.railway.app';

  useEffect(() => {
    axios.get(`https://waleedvetcare-backend-production.up.railway.app/api/products/${id}`)
    .then(r => setProduct(r.data)).catch(() => navigate('/'));
  }, [id, navigate]);

  if (!product) return <div className="loading">Loading product...</div>;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    alert('Added to cart!');
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'start'}}>
          <div style={{background:'linear-gradient(135deg,#e8f5ee,#d4ede0)',borderRadius:'var(--radius)',height:'400px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'8rem'}}>
            {product.image
              ? <img src={`${API}${product.image}`} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'var(--radius)'}} />
              : <span>{product.category === 'vaccine' ? '💉' : '💊'}</span>
            }
          </div>
          <div>
            <span className="product-category-badge">{product.category}</span>
            <h1 style={{fontSize:'1.8rem',margin:'10px 0',fontFamily:'Playfair Display,serif'}}>{product.name}</h1>
            <div style={{fontSize:'2rem',fontWeight:700,color:'var(--primary)',margin:'16px 0'}}>Rs. {product.price.toLocaleString()}</div>
            {product.usage && (
              <div style={{background:'#e8f5ee',borderRadius:'var(--radius-sm)',padding:'14px',marginBottom:'16px'}}>
                <strong>🎯 Usage:</strong> {product.usage}
              </div>
            )}
            <p style={{color:'var(--text-muted)',lineHeight:'1.8',marginBottom:'16px'}}>{product.description}</p>
            {product.benefits && (
              <div style={{marginBottom:'16px'}}>
                <strong style={{color:'var(--primary)'}}>✅ Benefits:</strong>
                <p style={{color:'var(--text-muted)',marginTop:'6px'}}>{product.benefits}</p>
              </div>
            )}
            <div style={{margin:'20px 0',padding:'14px',background:'var(--bg)',borderRadius:'var(--radius-sm)',display:'inline-block'}}>
              <strong>Stock: </strong>
              <span style={{color: product.stock > 10 ? 'var(--success)' : product.stock > 0 ? 'orange' : 'var(--danger)'}}>
                {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
              </span>
            </div>
            {product.stock > 0 && (
              <>
                <div style={{display:'flex',alignItems:'center',gap:'16px',margin:'20px 0'}}>
                  <label style={{fontWeight:600}}>Quantity:</label>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => setQty(Math.max(1, qty-1))}>-</button>
                    <span style={{fontWeight:700,fontSize:'1.1rem',minWidth:'30px',textAlign:'center'}}>{qty}</span>
                    <button className="qty-btn" onClick={() => setQty(Math.min(product.stock, qty+1))}>+</button>
                  </div>
                </div>
                <button className="btn-primary" style={{width:'100%',padding:'14px',borderRadius:'var(--radius-sm)',fontSize:'1rem'}} onClick={handleAddToCart}>
                  🛒 Add to Cart — Rs. {(product.price * qty).toLocaleString()}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}