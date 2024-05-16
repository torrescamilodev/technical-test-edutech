const express = require('express');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const { auth } = require('./utils/middleware');

const app = express();


connectDB();
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/chat', auth, chatRoutes);

module.exports = app;