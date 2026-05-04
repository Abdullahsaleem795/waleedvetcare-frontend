import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const API = 'https://waleedvetcare-backend-production.up.railway.app/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/products`).then(r => setFeatured(r.data.slice(0, 8))).catch(() => {});
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🏆 Pakistan's #1 Poultry Health Store</div>
          <h1>Premium Poultry <span>Medicines</span> & Vaccines</h1>
          <p>Trusted by 10,000+ poultry farmers across Pakistan.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/medicines')}>💊 Shop Medicines</button>
            <button className="btn-outline" onClick={() => navigate('/vaccines')}>💉 Vaccines</button>
            <button className="btn-outline" onClick={() => navigate('/cart')}>🛒 View Cart</button>
          </div>
        </div>
      </section>

      <section style={{background:'white',padding:'40px 0',borderBottom:'1px solid #e2ebe6'}}>
        <div className="container" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'20px',textAlign:'center'}}>
          {[['10,000+','Happy Farmers'],['500+','Products'],['98%','Authentic'],['24hr','Fast Delivery']].map(([num,label]) => (
            <div key={label}>
              <div style={{fontSize:'2rem',fontWeight:900,color:'var(--primary)',fontFamily:'Playfair Display,serif'}}>{num}</div>
              <div style={{fontSize:'0.85rem',color:'var(--text-muted)',marginTop:'4px'}}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{background:'var(--bg)'}}>
        <div className="container">
          <div className="section-title">
            <h2>Shop by Category</h2>
            <p>Find exactly what your flock needs</p>
            <div className="underline"></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'20px'}}>
            {[
              {icon:'💊',label:'Medicines',   sub:'Antibiotics & antiparasitics', path:'/medicines', color:'#e8f5ee'},
              {icon:'💉',label:'Vaccines',    sub:'Newcastle, Gumboro & more',    path:'/vaccines',  color:'#fff3e0'},
              {icon:'🧪',label:'Supplements', sub:'Vitamins & minerals',          path:'/medicines', color:'#e3f2fd'},
              {icon:'🐔',label:'Poultry Care',sub:'Disinfectants & equipment',    path:'/medicines', color:'#fce4ec'},
            ].map(cat => (
              <div key={cat.label} onClick={() => navigate(cat.path)}
                style={{background:cat.color,borderRadius:'var(--radius)',padding:'28px 20px',textAlign:'center',cursor:'pointer',transition:'transform 0.2s',border:'1px solid var(--border)'}}
                onMouseOver={e => e.currentTarget.style.transform='translateY(-4px)'}
                onMouseOut={e  => e.currentTarget.style.transform=''}
              >
                <div style={{fontSize:'3rem',marginBottom:'10px'}}>{cat.icon}</div>
                <h3 style={{fontSize:'1.1rem',marginBottom:'6px'}}>{cat.label}</h3>
                <p style={{fontSize:'0.82rem',color:'var(--text-muted)'}}>{cat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:'white'}}>
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>
            <p>Best sellers trusted by farmers across Pakistan</p>
            <div className="underline"></div>
          </div>
          {featured.length > 0
            ? <div className="products-grid">{featured.map(p => <ProductCard key={p._id} product={p} />)}</div>
            : <div className="loading">Loading products...</div>
          }
        </div>
      </section>

      <section className="section" style={{background:'var(--primary)',color:'white',textAlign:'center'}}>
        <div className="container">
          <h2 style={{fontSize:'2rem',marginBottom:'12px',color:'white'}}>Need Expert Advice?</h2>
          <p style={{opacity:0.85,marginBottom:'28px'}}>Our veterinary experts are available to help you</p>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="tel:+923001234567" style={{background:'var(--accent)',color:'white',padding:'12px 28px',borderRadius:'50px',fontWeight:700,fontSize:'1rem'}}>📞 Call Now</a>
            <a href="https://wa.me/923001234567" style={{background:'rgba(255,255,255,0.15)',color:'white',padding:'12px 28px',borderRadius:'50px',fontWeight:700,fontSize:'1rem',border:'2px solid rgba(255,255,255,0.4)'}}>💬 WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}