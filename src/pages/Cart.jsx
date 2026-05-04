import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal, deliveryCharges, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) return (
    <div className="empty-state" style={{padding:'100px 20px'}}>
      <div style={{fontSize:'5rem',marginBottom:'16px'}}>🛒</div>
      <h3>Your cart is empty</h3>
      <p style={{marginBottom:'24px',color:'var(--text-muted)'}}>Add some products to continue</p>
      <button className="btn-primary" onClick={() => navigate('/medicines')}>Shop Now</button>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="container">
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',marginBottom:'28px'}}>Shopping Cart</h1>
        <div style={{overflowX:'auto'}}>
          <table className="cart-table">
            <thead>
              <tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th>Remove</th></tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item._id}>
                  <td><strong>{item.name}</strong></td>
                  <td>Rs. {item.price.toLocaleString()}</td>
                  <td>
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity-1)}>-</button>
                      <span style={{fontWeight:700,fontSize:'1.1rem',minWidth:'24px',textAlign:'center'}}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity+1)}>+</button>
                    </div>
                  </td>
                  <td><strong>Rs. {(item.price * item.quantity).toLocaleString()}</strong></td>
                  <td><button onClick={() => removeFromCart(item._id)} style={{color:'var(--danger)',background:'none',border:'none',cursor:'pointer',fontSize:'1.2rem'}}>🗑</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cart-summary">
          <div className="summary-row"><span>Subtotal</span><span>Rs. {cartSubtotal.toLocaleString()}</span></div>
          <div className="summary-row"><span>Delivery</span><span>Rs. {deliveryCharges}</span></div>
          <div className="summary-row summary-total"><span>Grand Total</span><span>Rs. {cartTotal.toLocaleString()}</span></div>
          <button className="btn-primary" style={{width:'100%',marginTop:'16px',padding:'13px',borderRadius:'var(--radius-sm)'}} onClick={() => navigate('/checkout')}>
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}