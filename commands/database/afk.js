const Afk = require('../../database/models/afkSchema');
const mongoose = require('mongoose');

module.exports = {
    name: 'afk',
    cooldown: 30,
    aliases: ['away'],
    description: 'Sets a user to AFK in the server.',
    async execute(message, args, client) {
        let reason = args.join(" ");
        if (!reason) reason = "No given Reason.";
        let afkProfile = await Afk.findOne({ userID: message.author.id });
        if (!afkProfile) {
            afkProfile = await new Afk({
                _id: mongoose.Types.ObjectId(),
                userID: message.author.id,
                reason: reason,
            });
            await afkProfile.save();
            message.channel.send('You are now AFK! Have a good time :)');
        } else return message.channel.send('You are already AFK.');
    },
};