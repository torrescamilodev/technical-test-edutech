import React, { useState } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [auth, setAuth] = useState(!!localStorage.getItem('token'));

    return (
        <div>
            {auth ? <Chat setAuth={setAuth} /> : <Login setAuth={setAuth} />}
            {!auth && <Register setAuth={setAuth} />}
        </div>
    );
};

export default App;