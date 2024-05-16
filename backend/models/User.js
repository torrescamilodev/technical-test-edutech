const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['student', 'moderator'], default: 'student' }
});
module.exports = mongoose.model('User', UserSchema);