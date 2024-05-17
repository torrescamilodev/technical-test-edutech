import React from 'react';

const LogoutButton = ({ setAuth }) => {
    const logout = () => {
        localStorage.removeItem('token');
        setAuth(false);
    };

    return (
        <button className="logout" onClick={logout}>
            Logout
        </button>
    );
};

export default LogoutButton;