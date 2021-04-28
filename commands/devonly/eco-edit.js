const Balance = require('../../database/models/balanceSchema');
const mongoose = require('mongoose');
const Discord = require('discord.js');

module.exports = {
    name: "eco-edit",
    aliases: ["ee"],
    devOnly: true,
    async execute(message, args, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("You need to say a user.");
        
        let balanceProfile = await Balance.findOne({ userID: user.id });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: user.id,
            });
            await balanceProfile.save().catch(err => console.log(err));
        }

        if (!args[1]) return message.channel.send("You need to say how much cash you want the user to have.");
        if (args[1].isNaN) return message.channel.send("You need to say a number of cash.");
        await Balance.findOneAndUpdate({ userID: user.id }, { balance: args[1] });
        balanceProfile = await Balance.findOne({ userID: user.id });

        const balEditEmbed = new Discord.MessageEmbed()
            .setTitle("User Balance")
            .setDescription(`${user} now has **$${balanceProfile.balance}**.`)
            .setTimestamp()
            .setColor("GREEN");
        
        message.channel.send(balEditEmbed);
    },
};