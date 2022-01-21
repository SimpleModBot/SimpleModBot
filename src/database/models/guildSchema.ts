const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    prefix: { type: String, default: "\\" },
    memberRoleID: { type: String, required: false },
    modlogChannelID: { type: String, required: false },
    antiInvite: { type: Boolean, default: false },
    welcomeChannelID: { type: String, default: false },
});

module.exports = new mongoose.model('Guild', guildSchema, 'guilds');