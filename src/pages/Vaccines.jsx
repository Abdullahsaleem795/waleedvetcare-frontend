import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Vaccines() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    axios.get('https://waleedvetcare-backend-production.up.railway.app/api/products?category=vaccine')
      .then(r => { setProducts(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>💉 Poultry Vaccines</h1>
        <p>Newcastle, Gumboro, Marek's, IBD & more</p>
      </div>
      <section className="section">
        <div className="container">
          {loading ? <div className="loading">Loading...</div>
            : products.length > 0
              ? <div className="products-grid">{products.map(p => <ProductCard key={p._id} product={p} />)}</div>
              : <div className="empty-state"><h3>No vaccines found</h3></div>
          }
        </div>
      </section>
    </div>
  );
}