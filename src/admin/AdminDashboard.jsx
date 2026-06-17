import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (!admin) return navigate('/admin/login');
    API.get('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${admin.token}` }
    }).then(r => setStats(r.data)).catch(() => {});
  }, [admin, navigate]);

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">🐔 Waleed Poultry Solutions Admin</div>
        <nav className="admin-nav">
          <Link to="/admin" className="active">📊 Dashboard</Link>
          <Link to="/admin/products">📦 Products</Link>
          <Link to="/admin/orders">🧾 Orders</Link>
          <Link to="/admin/inventory">🏭 Inventory</Link>
          <Link to="/">👁 View Site</Link>
          <button onClick={() => { logoutAdmin(); navigate('/'); }}>
            Logout
          </button>
        </nav>
      </div>
      <div className="admin-content">
        <h2 style={{fontFamily:'Playfair Display,serif',marginBottom:'24px'}}>Welcome, {admin?.name} 👋</h2>
        <div className="stat-cards">
          {[
            {label:'Total Orders',   val: stats.totalOrders   || 0,                             icon:'🧾'},
            {label:"Today's Orders", val: stats.todayOrders   || 0,                             icon:'📅'},
            {label:'Total Revenue',  val:`Rs. ${(stats.totalSales||0).toLocaleString()}`,        icon:'💰'},
            {label:'Total Products', val: stats.totalProducts || 0,                             icon:'📦'},
          ].map(s => (
            <div key={s.label} className="stat-card">
              <h4>{s.icon} {s.label}</h4>
              <p>{s.val}</p>
            </div>
          ))}
        </div>
        <div style={{background:'white',borderRadius:'var(--radius)',padding:'24px',boxShadow:'var(--shadow)'}}>
          <h3 style={{fontFamily:'Playfair Display,serif',marginBottom:'16px'}}>Quick Actions</h3>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
            <button className="btn-success" onClick={() => navigate('/admin/products')}>+ Add Product</button>
            <button className="btn-success" onClick={() => navigate('/admin/orders')}>View Orders</button>
            <button className="btn-success" onClick={() => navigate('/admin/inventory')}>Manage Stock</button>
          </div>
        </div>
      </div>
    </div>
  );
}