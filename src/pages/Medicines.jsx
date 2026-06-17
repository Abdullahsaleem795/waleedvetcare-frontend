import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

export default function Medicines() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    API.get('/api/products?category=medicine')
      .then(r => { setProducts(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>💊 Poultry Medicines</h1>
        <p>Antibiotics, antiparasitics, antifungals & more</p>
      </div>
      <section className="section">
        <div className="container">
          {loading ? <div className="loading">Loading...</div>
            : products.length > 0
              ? <div className="products-grid">{products.map(p => <ProductCard key={p._id} product={p} />)}</div>
              : <div className="empty-state"><h3>No medicines found</h3></div>
          }
        </div>
      </section>
    </div>
  );
}