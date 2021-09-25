const Blacklist = require('../../../database/models/blackListSchema.ts');
const mongoose = require('mongoose');
const Discord = require("discord.js");

module.exports = {
    name: 'blacklist',
    description: 'Bans a member from using the bot.',
    devOnly: true,
    async execute(message, args, data, client) {
        const mentionedMember = message.mentions.members.first() || await message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");

        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('You need to give a user to blacklist along with why your banning them.').setColor('GREY')] });
        if (!mentionedMember) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('The member stated is not in the server.').setColor('GREY')] });
        if (!reason) reason = 'No given reason.';

        let profile = await Blacklist.findOne({
            userID: mentionedMember.user.id
        });

        if (profile) {
            await Blacklist.findOneAndDelete({ userID: mentionedMember.user.id });
            return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`I have removed ${mentionedMember.user.tag} from the blacklist.`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        };

        profile = await new Blacklist({
            _id: mongoose.Types.ObjectId(),
            userID: mentionedMember.user.id,
            reason: reason,
        });

        try {
            await profile.save();
            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('Successfully banned ' + mentionedMember.user.tag + ' from using the bot!').setColor('GREY')] });
        } catch (err) {
            const errorChannel = await client.channels.cache.get("832744410998767666");
            const errorMessage = new Discord.MessageEmbed()
                .setTitle("An error has occured!")
                .setDescription(err)
                .setTimestamp()
                .setColor("#ff0a0a");
            errorChannel.send(errorMessage);
        };
    },
};