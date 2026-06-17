import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function AdminOrders() {
  const { admin } = useAuth();
  const navigate  = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!admin) return navigate('/admin/login');
    API.get('/api/orders', { headers: { Authorization: `Bearer ${admin.token}` } })
      .then(r => setOrders(r.data));
  }, [admin, navigate]);
  const updateStatus = async (id, status) => {
    await API.put(`/api/orders/${id}/status`, { status }, { headers: { Authorization: `Bearer ${admin.token}` } });
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">🐔 WVC Admin</div>
        <nav className="admin-nav">
          <Link to="/admin">📊 Dashboard</Link>
          <Link to="/admin/products">📦 Products</Link>
          <Link to="/admin/orders" className="active">🧾 Orders</Link>
          <Link to="/admin/inventory">🏭 Inventory</Link>
        </nav>
      </div>
      <div className="admin-content">
        <h2 style={{fontFamily:'Playfair Display,serif',marginBottom:'24px'}}>All Orders</h2>
        <table className="admin-table">
          <thead><tr><th>Invoice #</th><th>Customer</th><th>Phone</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th>Update</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td><strong>{o.invoiceNumber}</strong></td>
                <td>{o.customer.name}</td>
                <td>{o.customer.phone}</td>
                <td>Rs. {o.totalAmount.toLocaleString()}</td>
                <td style={{textTransform:'uppercase',fontSize:'0.82rem'}}>{o.paymentMethod}</td>
                <td><span className={`status-badge status-${o.status}`}>{o.status}</span></td>
                <td style={{fontSize:'0.82rem'}}>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>
                  <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)} style={{padding:'5px 8px',borderRadius:'6px',border:'1px solid var(--border)',fontSize:'0.82rem',cursor:'pointer'}}>
                    {['pending','confirmed','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <div className="empty-state"><h3>No orders yet</h3></div>}
      </div>
    </div>
  );
}