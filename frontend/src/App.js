import React, { useState } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [auth, setAuth] = useState(!!localStorage.getItem('token'));
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div>
            {auth ? (
                <Chat setAuth={setAuth} />
            ) : (
                showRegister ? (
                    <Register setAuth={setAuth} />
                ) : (
                    <Login setAuth={setAuth} />
                )
            )}
            {!auth && (
                <div className="switch-form">
                    {showRegister ? (
                        <p>
                            ¿Ya tienes cuenta? <a href="#" onClick={() => setShowRegister(false)}>Inicia sesión</a>
                        </p>
                    ) : (
                        <p>
                            ¿No tienes cuenta? <a href="#" onClick={() => setShowRegister(true)}>Regístrate</a>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
