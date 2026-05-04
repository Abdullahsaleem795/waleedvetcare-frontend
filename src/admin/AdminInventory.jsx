import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function AdminInventory() {
  const { admin }  = useAuth();
  const navigate   = useNavigate();
  const [products, setProducts] = useState([]);
  const [records,  setRecords]  = useState([]);
  const [form,     setForm]     = useState({ product:'', type:'stock_in', quantity:'', note:'' });
  const [message,  setMessage]  = useState('');

  const headers = { headers: { Authorization: `Bearer ${admin?.token}` } };

  useEffect(() => {
    if (!admin) return navigate('/admin/login');
    axios.get('https://waleedvetcare-backend-production.up.railway.app/api/products').then(r => setProducts(r.data));
    fetchRecords();
  }, [admin, navigate]);

  const fetchRecords = () =>
    axios.get('https://waleedvetcare-backend-production.up.railway.app/api/inventory', headers).then(r => setRecords(r.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://waleedvetcare-backend-production.up.railway.app/api/inventory', form, headers);
      setMessage('Inventory updated!');
      setForm({ product:'', type:'stock_in', quantity:'', note:'' });
      fetchRecords();
      axios.get('https://waleedvetcare-backend-production.up.railway.app/api/products').then(r => setProducts(r.data));
    } catch { setMessage('Error updating inventory'); }
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">🐔 WVC Admin</div>
        <nav className="admin-nav">
          <Link to="/admin">📊 Dashboard</Link>
          <Link to="/admin/products">📦 Products</Link>
          <Link to="/admin/orders">🧾 Orders</Link>
          <Link to="/admin/inventory" className="active">🏭 Inventory</Link>
        </nav>
      </div>
      <div className="admin-content">
        <h2 style={{fontFamily:'Playfair Display,serif',marginBottom:'24px'}}>Inventory Management</h2>
        {message && <div className="alert alert-success">{message}</div>}
        <div className="admin-form" style={{marginBottom:'32px'}}>
          <h3 style={{marginBottom:'18px',color:'var(--primary)'}}>Record Stock Movement</h3>
          <form onSubmit={handleSubmit}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
              <div className="form-group"><label>Product *</label>
                <select value={form.product} onChange={e => setForm({...form,product:e.target.value})} required>
                  <option value="">Select Product</option>
                  {products.map(p => <option key={p._id} value={p._id}>{p.name} (Stock: {p.stock})</option>)}
                </select>
              </div>
              <div className="form-group"><label>Type *</label>
                <select value={form.type} onChange={e => setForm({...form,type:e.target.value})}>
                  <option value="stock_in">Stock In ➕</option>
                  <option value="stock_out">Stock Out ➖</option>
                </select>
              </div>
              <div className="form-group"><label>Quantity *</label><input type="number" min="1" value={form.quantity} onChange={e => setForm({...form,quantity:e.target.value})} required /></div>
              <div className="form-group"><label>Note</label><input value={form.note} onChange={e => setForm({...form,note:e.target.value})} placeholder="Optional note" /></div>
            </div>
            <button type="submit" className="btn-success">Save Record</button>
          </form>
        </div>
        <table className="admin-table">
          <thead><tr><th>Product</th><th>Type</th><th>Quantity</th><th>Current Stock</th><th>Note</th><th>Date</th></tr></thead>
          <tbody>
            {records.map(r => (
              <tr key={r._id}>
                <td><strong>{r.product?.name}</strong></td>
                <td><span style={{color: r.type==='stock_in'?'var(--success)':'var(--danger)',fontWeight:700}}>{r.type === 'stock_in' ? '➕ Stock In' : '➖ Stock Out'}</span></td>
                <td>{r.quantity}</td>
                <td>{r.product?.stock}</td>
                <td style={{color:'var(--text-muted)',fontSize:'0.85rem'}}>{r.note || '-'}</td>
                <td style={{fontSize:'0.82rem'}}>{new Date(r.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}