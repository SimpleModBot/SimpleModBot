const Balance = require('../../database/models/balanceSchema.ts');
const mongoose = require('mongoose');
const Discord = require('discord.js');

module.exports = {
    name: "balance",
    cooldown: 5,
    aliases: ["bal"],
    async execute(message, args, data, client) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let balanceProfile = await Balance.findOne({ userID: mentionedMember.user.id });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: mentionedMember.user.id,
                balance: 0,
                job: "none",
                exp: 0,
            });
            await balanceProfile.save().catch(err => console.log(err));
        };

        const balanceEmbed = new Discord.MessageEmbed()
            .setTitle("User Balance")
            .setDescription(`${mentionedMember} has:\n**$${balanceProfile.balance}** Money.\n**${balanceProfile.exp || 0}** Experience.`)
            .setTimestamp()
            .setColor("GREEN");

        message.channel.send({ embeds: [balanceEmbed] });
    },
};