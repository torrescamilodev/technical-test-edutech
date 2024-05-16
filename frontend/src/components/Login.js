import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            setAuth(true); // Establecer la autenticación y redirigir al chat
        } catch (err) {
            console.error(err);
            setError(err.response.data.errors[0].msg || 'Error al iniciar sesión');
        }
    };

    return (
        <div>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;