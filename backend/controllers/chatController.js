const Message = require('../models/Messaje');

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('user', 'name role');
        res.json(messages);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createMessage = async (req, res) => {
    const { text } = req.body;
    try {
        const message = new Message({
            user: req.user.id,
            text
        });
        await message.save();
        res.json(message);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};