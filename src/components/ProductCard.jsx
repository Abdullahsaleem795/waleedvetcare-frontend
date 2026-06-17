import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { API_URL } from '../utils/api';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate      = useNavigate();

  return (
    <div className="product-card">
      <div className="product-card-img">
        {product.image
          ? <img src={`${API_URL}${product.image}`} alt={product.name} />
          : <span>{product.category === 'vaccine' ? '💉' : product.category === 'supplement' ? '🧪' : '💊'}</span>
        }
      </div>
      <div className="product-card-body">
        <span className="product-category-badge">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description?.substring(0, 80)}...</p>
        <div className="product-price">Rs. {product.price.toLocaleString()} <span>/ unit</span></div>
        <div className="product-card-actions">
          <button className="btn-cart"    onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="btn-details" onClick={() => navigate(`/product/${product._id}`)}>Details</button>
        </div>
      </div>
    </div>
  );
}