import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error("El contenedor 'root' no existe en el DOM.");
}

const root = ReactDOM.createRoot(container);
root.render(<App />);