const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    lastEdited: String,
    prefix: { type: String, default: "//" },
    muteRoleID: { type: String, required: false },
    memberRoleID: { type: String, required: false },
    modlogChannelID: { type: String, required: false },
    levelSystem: { type: Boolean, default: false },
    bumpBuddy: { type: Boolean, default: false },
    bumpRole: { type: String, default: "undefined" },
});

module.exports = new mongoose.model('Guild', guildSchema, 'guilds');