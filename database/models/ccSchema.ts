const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Guild: String,
    Command: String,
    Response: String,
});

module.exports = new mongoose.model('custom-command', Schema, 'Commands');