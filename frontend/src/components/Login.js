import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = async () => {
        if (!username || !password) {
            setError('Por favor, llena todos los campos.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            setAuth(true); // Establecer la autenticación y redirigir al chat
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || 'Credenciales inválidas');
        }
    };

    return (
        <div className="container-login-register">
            <h3>Inicia Sesion</h3>
            <input className='input-check' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className='input-check' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='input-check' onClick={login}>Login</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;