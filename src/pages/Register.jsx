import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form,  setForm]  = useState({ name:'', email:'', password:'', phone:'' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate      = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      const { data } = await axios.post('https://waleedvetcare-backend-production.up.railway.app/api/auth/register', form);
      loginUser(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',padding:'40px 20px'}}>
      <div style={{background:'white',borderRadius:'var(--radius)',padding:'40px',width:'100%',maxWidth:'420px',boxShadow:'var(--shadow-lg)'}}>
        <h2 style={{textAlign:'center',marginBottom:'28px',fontFamily:'Playfair Display,serif',fontSize:'1.8rem'}}>Create Account</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          {[
            {name:'name',    label:'Full Name',  type:'text'},
            {name:'email',   label:'Email',      type:'email'},
            {name:'phone',   label:'Phone',      type:'tel'},
            {name:'password',label:'Password',   type:'password'},
          ].map(f => (
            <div key={f.name} className="form-group">
              <label>{f.label}</label>
              <input type={f.type} value={form[f.name]} onChange={e => setForm({...form,[f.name]:e.target.value})} required={f.name !== 'phone'} />
            </div>
          ))}
          <button type="submit" className="btn-primary" style={{width:'100%',padding:'13px',borderRadius:'var(--radius-sm)',fontSize:'1rem',border:'none'}}>Register</button>
        </form>
        <p style={{textAlign:'center',marginTop:'18px',fontSize:'0.9rem',color:'var(--text-muted)'}}>Already have account? <Link to="/login" style={{color:'var(--primary)',fontWeight:700}}>Login</Link></p>
      </div>
    </div>
  );
}