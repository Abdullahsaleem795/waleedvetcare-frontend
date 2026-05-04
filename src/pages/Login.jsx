import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://waleedvetcare-backend-production.up.railway.app/api/admin/login', 
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            
            // Login details local storage mein save karein
            localStorage.setItem('adminInfo', JSON.stringify(data));
            alert('Login Successful!');
            navigate('/admin/dashboard'); // Dashboard par bhej dein
        } catch (error) {
            alert(error.response && error.response.data.message 
                ? error.response.data.message 
                : 'Login Failed');
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default AdminLogin;