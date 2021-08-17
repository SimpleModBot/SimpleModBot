const Blacklist = require('../../../database/models/blackListSchema.ts');
const mongoose = require('mongoose');
const Discord = require("discord.js");

module.exports = {
    name: 'blacklist',
    description: 'Bans a member from using the bot.',
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        const mentionedMember = message.mentions.members.first() || await client.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");

        if (!args[0]) return message.channel.send({ content: 'You need to give a user to blacklist along with why your banning them.' });
        if (!mentionedMember) return message.channel.send({ content: 'The member stated is not in the server.' });
        if (!reason) reason = 'No given reason.';

        let profile = await Blacklist.findOne({
            userID: mentionedMember.user.id
        });

        if (profile) return message.channel.send({ content: 'This user is already banned from using the bot.' });
        profile = await new Blacklist({
            _id: mongoose.Types.ObjectId(),
            userID: mentionedMember.user.id,
            reason: reason,
        })
        try {
            await profile.save();
            message.channel.send({ content: 'Successfully banned ' + mentionedMember.user.tag + ' from using the bot!' });
        } catch (err) {
            const errorChannel = await client.channels.cache.get("832744410998767666");
            const errorMessage = new Discord.MessageEmbed()
                .setTitle("An error has occured!")
                .setDescription(err)
                .setTimestamp()
                .setColor("#ff0a0a");
            errorChannel.send(errorMessage);
        }
    },
};