const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    guildID: String,
    roles: Array
});

module.exports = new mongoose.model('reactionRole', Schema, 'ReactionRoles');