const Balance = require('../../database/models/balanceSchema.ts');
const mongoose = require('mongoose');
const Discord = require('discord.js');

module.exports = {
    name: "xp-edit",
    aliases: ["xe"],
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("You need to say a user.");

        let balanceProfile = await Balance.findOne({ userID: user.user.id });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: user.user.id,
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        if (args[1] == "ENA") return message.channel.send({ content: "You need to say how much experience you want the user to have." });
        if (args[1].isNaN) return message.channel.send({ content: "You need to say a number of experience." });
        await Balance.findOneAndUpdate({ userID: user.user.id }, { exp: args[1] });
        balanceProfile = await Balance.findOne({ userID: user.user.id });

        const balEditEmbed = new Discord.MessageEmbed()
            .setTitle("User Balance")
            .setDescription(`${user} now has **${balanceProfile.exp}** experience.`)
            .setTimestamp()
            .setColor("GREEN");

        message.channel.send({ embeds: [balEditEmbed] });
    },
};