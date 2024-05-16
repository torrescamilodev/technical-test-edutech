import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setAuth }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');

    const register = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, username, password, role });
            localStorage.setItem('token', res.data.token);
            setAuth(true); // Establecer la autenticación y redirigir al chat
        } catch (err) {
            console.error(err);
            setError(err.response.data.errors[0].msg || 'Error al registrar el usuario');
        }
    };

    return (
        <div>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="moderator">Moderator</option>
            </select>
            <button onClick={register}>Register</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Register;