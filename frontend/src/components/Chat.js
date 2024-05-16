import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = "http://localhost:5000";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const socket = socketIOClient(ENDPOINT, {
        transports: ['websocket'],
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/chat/messages', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }).then(res => setMessages(res.data));

        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const sendMessage = async () => {
        const res = await axios.post('http://localhost:5000/api/chat/message', { text }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        socket.emit('chatMessage', res.data);
        setText('');
    };

    return (
        <div>
            <div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/313OAdZakyY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div>
                {messages.map(msg => (
                    <div key={msg._id}>
                        <strong>{msg.user.name}</strong>: {msg.text}
                    </div>
                ))}
            </div>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;