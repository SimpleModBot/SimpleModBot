const Blacklist = require('../../database/models/blackListSchema');
const mongoose = require('mongoose');

module.exports = {
    name: 'blacklist',
    description: 'Bans a member from using the bot.',
    devOnly: true,
    async execute(message, args, client) {

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");

        if (!args[0]) return message.channel.send('You need to give a user to blacklist along with why your banning them.');
        if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
        if (!reason) reason = 'No given reason.';

        let profile = await Blacklist.findOne({
            userID: mentionedMember.user.id
        });

        if (profile) return message.channel.send('This user is already banned from using the bot.');
        profile = await new Blacklist({
            _id: mongoose.Types.ObjectId(),
            userID: mentionedMember.user.id,
            reason: reason,
        })
        try {
            await profile.save();
            message.channel.send('Successfully banned ' + mentionedMember.user.tag + ' from using the bot!');
        } catch (err) {
            console.log(err);
        }
    },
};