import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form,  setForm]  = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const { loginAdmin } = useAuth();
  const navigate       = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      const { data } = await API.post('/api/auth/admin/login', form);
      loginAdmin(data);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'var(--primary-dk)',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{background:'white',borderRadius:'var(--radius)',padding:'48px',width:'100%',maxWidth:'400px',boxShadow:'var(--shadow-lg)'}}>
        <div style={{textAlign:'center',marginBottom:'28px'}}>
          <div style={{fontSize:'3rem',marginBottom:'8px'}}>🔐</div>
          <h2 style={{fontFamily:'Playfair Display,serif',color:'var(--primary)'}}>Admin Login</h2>
          <p style={{color:'var(--text-muted)',fontSize:'0.9rem'}}>Waleed VetCare Admin Panel</p>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Admin Email</label><input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required /></div>
          <div className="form-group"><label>Password</label><input type="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} required /></div>
          <button type="submit" className="btn-primary" style={{width:'100%',padding:'13px',borderRadius:'var(--radius-sm)',border:'none',fontSize:'1rem'}}>Login to Admin Panel</button>
        </form>
      </div>
    </div>
  );
}