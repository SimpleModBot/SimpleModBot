const mongoose = require('mongoose');

const BlackListSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    reason: String,
})

module.exports = new mongoose.model('Blacklist', BlackListSchema, 'blacklists');