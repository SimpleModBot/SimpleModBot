const Blacklist = require('../../../database/models/blackListSchema.ts');
const mongoose = require('mongoose');
const Discord = require("discord.js");

module.exports = {
    name: 'blacklist',
    description: 'Bans a member from using the bot.',
    devOnly: true,
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('You need to give a user to blacklist along with why your banning them.').setColor('GREY')] });
        let reason = args.slice(1).join(" ");
        if (!reason) reason = 'No reason.';

        let profile = await Blacklist.findOne({
            userID: args[0]
        });

        if (profile) {
            const oreason = profile.reason;
            await Blacklist.findOneAndDelete({ userID: args[0] });
            return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`I have removed ${args[0]} from the blacklist.\nThey were banned for \`${oreason}\``).setColor('GREY')], allowedMentions: { repliedUser: false } });
        };

        profile = await new Blacklist({
            _id: mongoose.Types.ObjectId(),
            userID: args[0],
            reason: reason,
        });

        try {
            await profile.save();
            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Successfully banned ` + args[0] + ` from using the bot!\nThey were banned for \`${reason}\``).setColor('GREY')] });
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