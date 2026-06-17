import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = ['/', '/medicines', '/vaccines', '/warehouse'];

export default function Navbar() {
  const { cartCount }        = useCart();
  const { user, logoutUser } = useAuth();
  const navigate             = useNavigate();
  const location             = useLocation();

  const activeIdx = NAV_LINKS.indexOf(location.pathname);

  const linkStyle = (idx) => ({
    padding: '7px 14px',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.9rem',
    transition: 'all 0.4s ease',
    background: activeIdx === idx ? 'var(--primary)' : 'transparent',
    color: activeIdx === idx ? 'white' : 'var(--text)',
    boxShadow: activeIdx === idx ? '0 4px 14px rgba(13,110,79,0.3)' : 'none',
    transform: activeIdx === idx ? 'translateY(-2px)' : 'none',
  });

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          🐔 Waleed<span> Poultry Solutions</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" style={linkStyle(0)}>Home</Link>
          <Link to="/medicines" style={linkStyle(1)}>Medicines</Link>
          <Link to="/vaccines" style={linkStyle(2)}>Vaccines</Link>
          <Link to="/warehouse" style={linkStyle(3)}>Warehouse</Link>
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
