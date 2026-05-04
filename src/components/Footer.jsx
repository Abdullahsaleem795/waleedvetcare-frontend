import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>🐔 WaleedVetCare</h4>
            <p style={{fontSize:'0.88rem',lineHeight:'1.8'}}>Pakistan's trusted source for premium poultry medicines, vaccines, and supplements.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/medicines">Medicines</Link></li>
              <li><Link to="/vaccines">Vaccines</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>📞 +92-300-1234567</li>
              <li>📧 info@waleedpoultrysolutions.pk</li>
              <li>📍 Sargodha, Punjab, Pakistan</li>
            </ul>
          </div>
          <div>
            <h4>Admin</h4>
            <ul>
              <li><Link to="/admin/login">Admin Login</Link></li>
              <li><Link to="/admin">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Waleed Poultry Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}