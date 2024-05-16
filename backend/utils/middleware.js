const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('No token, authorization denied');

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).send('Token is not valid');
    }
};