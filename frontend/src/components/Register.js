import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setAuth }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');

    const register = async () => {
        if (!name || !username || !password) {
            setError('Por favor, llena todos los campos.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, username, password, role });
            localStorage.setItem('token', res.data.token);
            setAuth(true); // Establecer la autenticación y redirigir al chat
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || 'Error al registrar el usuario - Puede que el usuario ya exista');
        }
    };

    return (
        <div className="container-login-register">
            <h3>Registrate</h3>
            <input className='input-check' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className='input-check' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className='input-check' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select className='input-check' value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="moderator">Moderator</option>
            </select>
            <button className='input-check' onClick={register}>Register</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Register;