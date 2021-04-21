const mongoose = require('mongoose');

const modlogSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelID: String,
    guildID: String,
})

module.exports = new mongoose.model('Modlog', modlogSchema, 'modlogChannels');