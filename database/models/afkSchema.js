const mongoose = require('mongoose');

const afkSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userID: String,
    reason: String,
    messagesLeft: {type: Number, default: 3}
})

module.exports = new mongoose.model('Afk', afkSchema, 'afks');