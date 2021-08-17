const mongoose = require("mongoose");

const pingSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    pings: Number
})

module.exports = new mongoose.model('Ping', pingSchema, 'pings');