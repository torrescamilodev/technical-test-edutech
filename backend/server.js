// server.js
const http = require('http');
const socketio = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));