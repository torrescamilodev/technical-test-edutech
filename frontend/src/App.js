import React, { useState } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [auth, setAuth] = useState(!!localStorage.getItem('token')); // Comprobar si hay un token almacenado

    return (
        <div>
            {auth ? <Chat /> : <Login setAuth={setAuth} />}
            {!auth && <Register setAuth={setAuth} />}
        </div>
    );
};

export default App;
