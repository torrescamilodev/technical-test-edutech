const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../utils/middleware');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, username, password, role } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'Usuario ya registrado' }] });
        }
        
        user = new User({ name, username, password: bcrypt.hashSync(password, 10), role });
        await user.save();
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1m' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).send('Invalid Credentials');
        }
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1m' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;