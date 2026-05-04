import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function AdminProducts() {
  const { admin }  = useAuth();
  const navigate   = useNavigate();
  const [products, setProducts] = useState([]);
  const [form,     setForm]     = useState({ name:'', category:'medicine', price:'', description:'', benefits:'', usage:'', stock:'' });
  const [image,    setImage]    = useState(null);
  const [editId,   setEditId]   = useState(null);
  const [message,  setMessage]  = useState('');

  const headers = { headers: { Authorization: `Bearer ${admin?.token}` } };

  useEffect(() => {
    if (!admin) return navigate('/admin/login');
    fetchProducts();
  }, [admin]);

  const fetchProducts = () => axios.get('https://waleedvetcare-backend-production.up.railway.app/api/products').then(r => setProducts(r.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append('image', image);
    try {
      if (editId) {
        await axios.put(`https://waleedvetcare-backend-production.up.railway.app/api/products/${editId}`, fd, headers);
        setMessage('Product updated!'); setEditId(null);
      } else {
        await axios.post('https://waleedvetcare-backend-production.up.railway.app/api/products', fd, headers);
        setMessage('Product added!');
      }
      setForm({ name:'', category:'medicine', price:'', description:'', benefits:'', usage:'', stock:'' });
      setImage(null);
      fetchProducts();
    } catch { setMessage('Error saving product'); }
  };

  const handleEdit   = (p) => { setForm({name:p.name,category:p.category,price:p.price,description:p.description,benefits:p.benefits||'',usage:p.usage||'',stock:p.stock}); setEditId(p._id); window.scrollTo(0,0); };
  const handleDelete = async (id) => { if (!window.confirm('Delete?')) return; await axios.delete(`https://waleedvetcare-backend-production.up.railway.app/api/products/${id}`, headers); fetchProducts(); };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">🐔 WVC Admin</div>
        <nav className="admin-nav">
          <Link to="/admin">📊 Dashboard</Link>
          <Link to="/admin/products" className="active">📦 Products</Link>
          <Link to="/admin/orders">🧾 Orders</Link>
          <Link to="/admin/inventory">🏭 Inventory</Link>
        </nav>
      </div>
      <div className="admin-content">
        <h2 style={{fontFamily:'Playfair Display,serif',marginBottom:'24px'}}>Manage Products</h2>
        {message && <div className="alert alert-success">{message}</div>}
        <div className="admin-form" style={{marginBottom:'32px'}}>
          <h3 style={{marginBottom:'18px',color:'var(--primary)'}}>{editId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
              <div className="form-group"><label>Product Name *</label><input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required /></div>
              <div className="form-group"><label>Category *</label>
                <select value={form.category} onChange={e => setForm({...form,category:e.target.value})}>
                  <option value="medicine">Medicine</option>
                  <option value="vaccine">Vaccine</option>
                  <option value="supplement">Supplement</option>
                  <option value="care">Poultry Care</option>
                </select>
              </div>
              <div className="form-group"><label>Price (Rs.) *</label><input type="number" value={form.price} onChange={e => setForm({...form,price:e.target.value})} required /></div>
              <div className="form-group"><label>Stock *</label><input type="number" value={form.stock} onChange={e => setForm({...form,stock:e.target.value})} required /></div>
            </div>
            <div className="form-group"><label>Description *</label><textarea value={form.description} onChange={e => setForm({...form,description:e.target.value})} rows={3} required style={{width:'100%',padding:'11px 14px',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',fontFamily:'Mulish,sans-serif',resize:'vertical'}} /></div>
            <div className="form-group"><label>Benefits</label><input value={form.benefits} onChange={e => setForm({...form,benefits:e.target.value})} /></div>
            <div className="form-group"><label>Usage</label><input value={form.usage} onChange={e => setForm({...form,usage:e.target.value})} /></div>
            <div className="form-group"><label>Product Image</label><input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} /></div>
            <button type="submit" className="btn-success">{editId ? 'Update Product' : 'Add Product'}</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({name:'',category:'medicine',price:'',description:'',benefits:'',usage:'',stock:''}); }} style={{marginLeft:'10px',padding:'10px 20px',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',background:'white',cursor:'pointer'}}>Cancel</button>}
          </form>
        </div>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td><strong>{p.name}</strong></td>
                <td><span className="product-category-badge">{p.category}</span></td>
                <td>Rs. {p.price.toLocaleString()}</td>
                <td style={{color: p.stock <= 10 ? 'var(--danger)' : 'var(--success)'}}>{p.stock}</td>
                <td>
                  <button onClick={() => handleEdit(p)} style={{background:'var(--primary)',color:'white',border:'none',padding:'6px 12px',borderRadius:'6px',marginRight:'6px',cursor:'pointer',fontSize:'0.82rem'}}>✏️ Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="btn-danger">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}