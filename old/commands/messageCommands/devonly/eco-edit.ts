const Balance = require('../../../database/models/balanceSchema.ts');
const mongoose = require('mongoose');
const Discord = require('discord.js');

module.exports = {
    name: "eco-edit",
    aliases: ["ee"],
    devOnly: true,
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to say a user.").setColor('GREY')] });

        let balanceProfile = await Balance.findOne({ userID: user.user.id });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: user.user.id,
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        if (args[1] == "ENA") return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to say how much cash you want the user to have.").setColor('GREY')] });
        if (args[1].isNaN) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to say a number of cash.").setColor('GREY')] });
        await Balance.findOneAndUpdate({ userID: user.user.id }, { balance: args[1] });
        balanceProfile = await Balance.findOne({ userID: user.user.id });

        const balEditEmbed = new Discord.MessageEmbed()
            .setTitle("User Balance")
            .setDescription(`${user} now has **$${balanceProfile.balance}**.`)
            .setTimestamp()
            .setColor("GREEN");

        message.channel.send({ embeds: [balEditEmbed] });
    },
};