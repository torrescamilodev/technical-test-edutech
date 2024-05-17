import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import LogoutButton from './LogoutButton';

const ENDPOINT = "http://localhost:5000";

const Chat = ({ setAuth }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const socket = socketIOClient(ENDPOINT, {
        transports: ['websocket'],
    });

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/chat/messages', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setMessages(res.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    setAuth(false); // Redirigir al usuario a la pantalla de login
                }
                console.error(err);
            }
        };

        fetchMessages();

        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.disconnect();
        };
    }, [setAuth, socket]);

    const sendMessage = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/chat/message', { text }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            socket.emit('chatMessage', res.data);
            setText('');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('token');
                setAuth(false); // Redirigir al usuario a la pantalla de login
            }
            console.error(err);
        }
    };

    return (
        <div className="container chat">
            <div className="video-container">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="chat-container">
                <LogoutButton setAuth={setAuth}/>
                <div className="messages">
                    {messages.map((msg) => (
                        <div key={msg._id}>
                            <strong>{msg.user?.name}</strong>: {msg.text}
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;