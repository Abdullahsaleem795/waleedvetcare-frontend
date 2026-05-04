import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cartCount }        = useCart();
  const { user, logoutUser } = useAuth();
  const navigate             = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          🐔 Waleed<span>Poultry Solutions</span>
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/medicines">Medicines</Link>
          <Link to="/vaccines">Vaccines</Link>
          <Link to="/warehouse">Warehouse</Link>
          <Link to="/cart" className="cart-btn">
            🛒 Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          {user
            ? <button onClick={() => { logoutUser(); navigate('/'); }} style={{padding:'7px 14px',borderRadius:'8px',border:'1.5px solid #e2ebe6',background:'white',fontWeight:600,cursor:'pointer'}}>Logout</button>
            : <Link to="/login" style={{padding:'7px 14px',borderRadius:'8px',border:'1.5px solid #e2ebe6',background:'white',fontWeight:600}}>Login</Link>
          }
        </div>
      </div>
    </nav>
  );
}