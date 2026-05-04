import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Warehouse() {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin') || 'null');
    if (!admin) return;
    axios.get('https://waleedvetcare-backend-production.up.railway.app/api/inventory/lowstock', {
      headers: { Authorization: `Bearer ${admin.token}` }
    }).then(r => setLowStock(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>🏭 Warehouse</h1>
        <p>Inventory overview and stock management</p>
      </div>
      <section className="section">
        <div className="container">
          <h2 style={{fontFamily:'Playfair Display,serif',marginBottom:'24px',color:'var(--danger)'}}>⚠️ Low Stock Alert</h2>
          {lowStock.length > 0 ? (
            <div className="products-grid">
              {lowStock.map(p => (
                <div key={p._id} style={{background:'#fff3cd',border:'1px solid #ffc107',borderRadius:'var(--radius)',padding:'20px'}}>
                  <h3 style={{marginBottom:'6px'}}>{p.name}</h3>
                  <p style={{color:'var(--danger)',fontWeight:700}}>Stock: {p.stock} units remaining</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div style={{fontSize:'3rem',marginBottom:'12px'}}>✅</div>
              <h3>All products have sufficient stock</h3>
              <p style={{color:'var(--text-muted)'}}>Login as admin to manage inventory</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}