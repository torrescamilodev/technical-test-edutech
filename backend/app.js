const express = require('express');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const { auth } = require('./utils/middleware');
const cors = require('cors');


const app = express();


connectDB();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/chat', auth, chatRoutes);

module.exports = app;