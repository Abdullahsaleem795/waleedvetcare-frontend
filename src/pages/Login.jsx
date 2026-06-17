import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form,  setForm]  = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate      = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      const { data } = await API.post('/api/auth/login', form);
      loginUser(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',padding:'40px 20px'}}>
      <div style={{background:'white',borderRadius:'var(--radius)',padding:'40px',width:'100%',maxWidth:'420px',boxShadow:'var(--shadow-lg)'}}>
        <h2 style={{textAlign:'center',marginBottom:'28px',fontFamily:'Playfair Display,serif',fontSize:'1.8rem'}}>Customer Login</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} required />
          </div>
          <button type="submit" className="btn-primary" style={{width:'100%',padding:'13px',borderRadius:'var(--radius-sm)',fontSize:'1rem',border:'none'}}>Login</button>
        </form>
        <p style={{textAlign:'center',marginTop:'18px',fontSize:'0.9rem',color:'var(--text-muted)'}}>Don't have an account? <Link to="/register" style={{color:'var(--primary)',fontWeight:700}}>Register</Link></p>
      </div>
    </div>
  );
}