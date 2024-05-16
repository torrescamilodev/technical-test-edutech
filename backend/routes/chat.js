const express = require('express');
const { auth } = require('../utils/middleware');
const { getMessages, createMessage } = require('../controllers/chatController');
const router = express.Router();

router.get('/messages', auth, getMessages);
router.post('/message', auth, createMessage);

module.exports = router;