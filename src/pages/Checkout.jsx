import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartSubtotal, deliveryCharges, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', phone:'', address:'', city:'', postalCode:'', email:'' });
  const [payment, setPayment] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountTitle, setAccountTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const pakistaniBanks = [
    'HBL — Habib Bank Limited',
    'MCB — Muslim Commercial Bank',
    'UBL — United Bank Limited',
    'ABL — Allied Bank Limited',
    'NBP — National Bank of Pakistan',
    'Meezan Bank',
    'Bank Alfalah',
    'Faysal Bank',
    'Standard Chartered Pakistan',
    'Askari Bank',
    'Bank Al-Habib',
    'Silk Bank',
    'Summit Bank',
    'JS Bank',
    'Soneri Bank',
    'Bank of Punjab',
    'Bank of Khyber',
    'Zarai Taraqiati Bank (ZTBL)',
    'First Women Bank',
    'Industrial Development Bank',
  ];

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address || !form.city) return setError('Please fill all required fields');
    if (cartItems.length === 0) return setError('Your cart is empty');
    if (payment === 'bank' && (!bankName || !accountTitle || !accountNumber || !transactionId)) return setError('Please fill all bank transfer details');
    if ((payment === 'easypaisa' || payment === 'jazzcash') && (!senderNumber || !transactionId)) return setError('Please fill all payment details');
    setLoading(true); setError('');
    try {
      const orderData = {
        customer: form,
        items: cartItems.map(i => ({ product: i._id, name: i.name, price: i.price, quantity: i.quantity })),
        subtotal: cartSubtotal,
        deliveryCharges,
        totalAmount: cartTotal,
        paymentMethod: payment,
        paymentDetails: payment === 'bank'
          ? { bankName, accountTitle, accountNumber, transactionId }
          : payment === 'easypaisa' || payment === 'jazzcash'
          ? { senderNumber, transactionId }
          : {},
      };
      const { data } = await API.post('/api/orders', orderData);
      clearCart();
      navigate(`/invoice/${data._id}`);
    } catch (e) {
      setError(e.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',marginBottom:'28px'}}>Checkout</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="checkout-grid">
          <div>

            {/* DELIVERY INFO */}
            <div className="card-section">
              <h3>📦 Delivery Information</h3>
              {[
                {name:'name',       label:'Full Name *',    placeholder:'Muhammad Waleed'},
                {name:'phone',      label:'Phone Number *', placeholder:'03001234567'},
                {name:'email',      label:'Email',          placeholder:'email@example.com'},
                {name:'address',    label:'Full Address *', placeholder:'House #, Street, Area'},
                {name:'city',       label:'City *',         placeholder:'Sahiwal'},
                {name:'postalCode', label:'Postal Code',    placeholder:'57000'},
              ].map(f => (
                <div key={f.name} className="form-group">
                  <label>{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} />
                </div>
              ))}
            </div>

            {/* PAYMENT METHOD */}
            <div className="card-section">
              <h3>💳 Payment Method</h3>
              <div className="payment-methods">
                {[
                  {id:'cod',       label:'💵 Cash on Delivery'},
                  {id:'bank',      label:'🏦 Bank Transfer'},
                  {id:'easypaisa', label:'📱 EasyPaisa'},
                  {id:'jazzcash',  label:'💚 JazzCash'},
                ].map(p => (
                  <div key={p.id} className={`payment-option ${payment === p.id ? 'selected' : ''}`} onClick={() => setPayment(p.id)}>
                    {p.label}
                  </div>
                ))}
              </div>

              {/* COD DETAILS */}
              {payment === 'cod' && (
                <div style={{marginTop:'20px',background:'#e8f5ee',borderRadius:'8px',padding:'16px',border:'1px solid #b2dfdb'}}>
                  <p style={{fontWeight:700,color:'var(--primary)',marginBottom:'8px'}}>💵 Cash on Delivery — How it works:</p>
                  <ul style={{paddingLeft:'18px',fontSize:'13px',color:'#444',lineHeight:'2'}}>
                    <li>Place your order online</li>
                    <li>Our courier will deliver within 2-3 working days</li>
                    <li>Pay cash at the time of delivery</li>
                    <li>You will receive a receipt ✅</li>
                  </ul>
                </div>
              )}

              {/* BANK TRANSFER DETAILS */}
              {payment === 'bank' && (
                <div style={{marginTop:'20px'}}>
                  {/* Our Bank Details */}
                  <div style={{background:'#e8f5ee',borderRadius:'8px',padding:'16px',marginBottom:'16px',border:'1px solid #b2dfdb'}}>
                    <p style={{fontWeight:700,color:'var(--primary)',marginBottom:'12px'}}>🏦 Our Bank Accounts — Please Transfer Here:</p>
                    {[
                      {bank:'HBL — Habib Bank Limited',     title:'Waleed VetCare',          number:'0123-4567890-001'},
                      {bank:'MCB — Muslim Commercial Bank', title:'Waleed Poultry Solutions', number:'1234567890123456'},
                      {bank:'Meezan Bank',                  title:'Waleed VetCare',           number:'02340123456789'},
                      {bank:'Bank Alfalah',                 title:'Waleed VetCare',           number:'0345-6789012-003'},
                    ].map((acc, i) => (
                      <div key={i} style={{background:'white',borderRadius:'6px',padding:'12px',marginBottom:'8px',border:'1px solid #ddd'}}>
                        <p style={{fontWeight:700,fontSize:'13px',color:'var(--primary)'}}>{acc.bank}</p>
                        <p style={{fontSize:'12px',color:'#555'}}>Account Title: <strong>{acc.title}</strong></p>
                        <p style={{fontSize:'12px',color:'#555'}}>Account Number: <strong style={{color:'var(--primary)',fontSize:'14px'}}>{acc.number}</strong></p>
                      </div>
                    ))}
                  </div>

                  {/* Customer Bank Details */}
                  <p style={{fontWeight:700,marginBottom:'12px',color:'var(--primary)'}}>📝 Enter Your Transfer Details:</p>
                  <div className="form-group">
                    <label>Your Bank *</label>
                    <select value={bankName} onChange={e => setBankName(e.target.value)} style={{width:'100%',padding:'11px 14px',border:'1.5px solid var(--border)',borderRadius:'8px',fontSize:'13px',background:'white'}}>
                      <option value="">-- Select Your Bank --</option>
                      {pakistaniBanks.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Account Title *</label>
                    <input value={accountTitle} onChange={e => setAccountTitle(e.target.value)} placeholder="Name on your bank account" />
                  </div>
                  <div className="form-group">
                    <label>Your Account Number *</label>
                    <input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="Your bank account number" />
                  </div>
                  <div className="form-group">
                    <label>Transaction ID *</label>
                    <input value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="Reference/Transaction ID received after transfer" />
                  </div>
                  <div style={{background:'#fff3cd',borderRadius:'8px',padding:'12px',border:'1px solid #ffc107',fontSize:'12px',color:'#856404'}}>
                    ⚠️ <strong>Important:</strong> Please enter the Transaction ID after completing the transfer. Orders without a valid Transaction ID will not be confirmed!
                  </div>
                </div>
              )}

              {/* EASYPAISA DETAILS */}
              {payment === 'easypaisa' && (
                <div style={{marginTop:'20px'}}>
                  {/* Our EasyPaisa */}
                  <div style={{background:'#e8f5ee',borderRadius:'8px',padding:'16px',marginBottom:'16px',border:'1px solid #b2dfdb'}}>
                    <p style={{fontWeight:700,color:'var(--primary)',marginBottom:'12px'}}>📱 Send Payment to Our EasyPaisa Account:</p>
                    <div style={{background:'white',borderRadius:'6px',padding:'16px',textAlign:'center',border:'1px solid #ddd'}}>
                      <p style={{fontSize:'13px',color:'#555',marginBottom:'4px'}}>Account Name</p>
                      <p style={{fontWeight:700,fontSize:'16px',color:'var(--primary)'}}>Waleed VetCare</p>
                      <p style={{fontSize:'13px',color:'#555',margin:'8px 0 4px'}}>EasyPaisa Number</p>
                      <p style={{fontWeight:700,fontSize:'24px',color:'#00a651',letterSpacing:'2px'}}>0300-1234567</p>
                    </div>
                    <ul style={{paddingLeft:'18px',fontSize:'12px',color:'#444',lineHeight:'2',marginTop:'12px'}}>
                      <li>Send payment via EasyPaisa App or dial *786#</li>
                      <li>Note down your Transaction ID</li>
                      <li>Enter the details in the form below</li>
                    </ul>
                  </div>

                  {/* Customer Details */}
                  <p style={{fontWeight:700,marginBottom:'12px',color:'var(--primary)'}}>📝 Enter Your Payment Details:</p>
                  <div className="form-group">
                    <label>Your EasyPaisa Number *</label>
                    <input value={senderNumber} onChange={e => setSenderNumber(e.target.value)} placeholder="Number used to send payment" />
                  </div>
                  <div className="form-group">
                    <label>Transaction ID *</label>
                    <input value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="EasyPaisa Transaction ID" />
                  </div>
                  <div style={{background:'#fff3cd',borderRadius:'8px',padding:'12px',border:'1px solid #ffc107',fontSize:'12px',color:'#856404'}}>
                    ⚠️ <strong>Important:</strong> Incorrect Transaction ID may result in order cancellation!
                  </div>
                </div>
              )}

              {/* JAZZCASH DETAILS */}
              {payment === 'jazzcash' && (
                <div style={{marginTop:'20px'}}>
                  {/* Our JazzCash */}
                  <div style={{background:'#e8f5ee',borderRadius:'8px',padding:'16px',marginBottom:'16px',border:'1px solid #b2dfdb'}}>
                    <p style={{fontWeight:700,color:'var(--primary)',marginBottom:'12px'}}>💚 Send Payment to Our JazzCash Account:</p>
                    <div style={{background:'white',borderRadius:'6px',padding:'16px',textAlign:'center',border:'1px solid #ddd'}}>
                      <p style={{fontSize:'13px',color:'#555',marginBottom:'4px'}}>Account Name</p>
                      <p style={{fontWeight:700,fontSize:'16px',color:'var(--primary)'}}>Waleed VetCare</p>
                      <p style={{fontSize:'13px',color:'#555',margin:'8px 0 4px'}}>JazzCash Number</p>
                      <p style={{fontWeight:700,fontSize:'24px',color:'#cc0001',letterSpacing:'2px'}}>0301-1234567</p>
                    </div>
                    <ul style={{paddingLeft:'18px',fontSize:'12px',color:'#444',lineHeight:'2',marginTop:'12px'}}>
                      <li>Send payment via JazzCash App or dial *786#</li>
                      <li>Note down your Transaction ID</li>
                      <li>Enter the details in the form below</li>
                    </ul>
                  </div>

                  {/* Customer Details */}
                  <p style={{fontWeight:700,marginBottom:'12px',color:'var(--primary)'}}>📝 Enter Your Payment Details:</p>
                  <div className="form-group">
                    <label>Your JazzCash Number *</label>
                    <input value={senderNumber} onChange={e => setSenderNumber(e.target.value)} placeholder="Number used to send payment" />
                  </div>
                  <div className="form-group">
                    <label>Transaction ID *</label>
                    <input value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="JazzCash Transaction ID" />
                  </div>
                  <div style={{background:'#fff3cd',borderRadius:'8px',padding:'12px',border:'1px solid #ffc107',fontSize:'12px',color:'#856404'}}>
                    ⚠️ <strong>Important:</strong> Incorrect Transaction ID may result in order cancellation!
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <div className="cart-summary" style={{position:'sticky',top:'90px'}}>
              <h3 style={{marginBottom:'16px',fontFamily:'Playfair Display,serif'}}>Order Summary</h3>
              {cartItems.map(i => (
                <div key={i._id} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',fontSize:'0.88rem',borderBottom:'1px solid var(--border)'}}>
                  <span>{i.name} × {i.quantity}</span>
                  <span>Rs. {(i.price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="summary-row" style={{marginTop:'12px'}}><span>Subtotal</span><span>Rs. {cartSubtotal.toLocaleString()}</span></div>
              <div className="summary-row"><span>Delivery Charges</span><span>Rs. {deliveryCharges}</span></div>
              <div className="summary-row summary-total"><span>Grand Total</span><span>Rs. {cartTotal.toLocaleString()}</span></div>
              <button className="btn-primary" style={{width:'100%',marginTop:'16px',padding:'13px',borderRadius:'var(--radius-sm)'}} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Placing Order...' : '✅ Place Order'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}