const Balance = require('../../database/models/balanceSchema');
const mongoose = require('mongoose');
const Discord = require('discord.js');

module.exports = {
    name: "balance",
    cooldown: 5,
    aliases: ["bal"],
    async execute(message, args, client) {
        let mentionedMember = message.member.id;

        let balanceProfile = await Balance.findOne({ userID: mentionedMember });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: mentionedMember,
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        balanceProfile = await Balance.findOne({ userID: user.id });

        const balanceEmbed = new Discord.MessageEmbed()
            .setTitle("User Balance")
            .setDescription(`<@${mentionedMember}> has **$${balanceProfile.balance}**.`)
            .setTimestamp()
            .setColor("GREEN");

        message.channel.send(balanceEmbed);
    },
};