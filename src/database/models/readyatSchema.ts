const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    time: { type: Number, required: true },
    readable: { type: String, required: true },
    timezone: { type: String, required: true, default: 'PST/Pacific Standard Time' },
});

module.exports = new mongoose.model('readyat', Schema);