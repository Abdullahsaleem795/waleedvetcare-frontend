import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

export default function Invoice() {
  const { id }    = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    API.get(`/api/orders/${id}`).then(r => setOrder(r.data)).catch(() => {});
  }, [id]);

  if (!order) return <div className="loading">Loading invoice...</div>;

  return (
    <div className="invoice-page">
      <div className="container">
        <div style={{textAlign:'center',marginBottom:'24px'}} className="no-print">
          <div className="alert alert-success">✅ Order placed successfully!</div>
          <button className="print-btn" onClick={() => window.print()}>🖨️ Print Invoice</button>
        </div>
        <div className="invoice-box">
          <div className="invoice-header">
            <div>
              <div className="invoice-logo">🐔 Waleed<span>VetCare</span></div>
              <p style={{marginTop:'6px',fontSize:'0.85rem',color:'var(--text-muted)'}}>Sahiwal, Punjab, Pakistan<br/>+92-300-1234567</p>
            </div>
            <div className="invoice-meta">
              <p><strong>Invoice #:</strong> {order.invoiceNumber}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-PK')}</p>
              <p><strong>Status:</strong> <span style={{color:'var(--primary)',fontWeight:700,textTransform:'uppercase'}}>{order.status}</span></p>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'24px'}}>
            <div>
              <h4 style={{color:'var(--primary)',marginBottom:'8px'}}>Bill To:</h4>
              <p><strong>{order.customer.name}</strong></p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city} {order.customer.postalCode}</p>
              <p>📞 {order.customer.phone}</p>
            </div>
            <div>
              <h4 style={{color:'var(--primary)',marginBottom:'8px'}}>Payment:</h4>
              <p style={{textTransform:'uppercase',fontWeight:700}}>{order.paymentMethod}</p>
            </div>
          </div>
          <table className="invoice-table">
            <thead>
              <tr><th>#</th><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{item.name}</td>
                  <td>Rs. {item.price.toLocaleString()}</td>
                  <td>{item.quantity}</td>
                  <td>Rs. {(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="invoice-totals">
            <div><span>Subtotal</span><span>Rs. {order.subtotal.toLocaleString()}</span></div>
            <div><span>Delivery</span><span>Rs. {order.deliveryCharges.toLocaleString()}</span></div>
            <div className="invoice-grand"><span>Grand Total</span><span>Rs. {order.totalAmount.toLocaleString()}</span></div>
          </div>
          <div style={{marginTop:'32px',padding:'16px',background:'#f8faf9',borderRadius:'var(--radius-sm)',fontSize:'0.85rem',color:'var(--text-muted)',textAlign:'center'}}>
            Thank you for trusting Waleed VetCare! 🐔 Support: +92-300-1234567
          </div>
        </div>
      </div>
    </div>
  );
}