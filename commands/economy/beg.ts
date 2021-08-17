const Discord = require('discord.js');
const Balance = require('../../database/models/balanceSchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: "beg",
    cooldown: 10,
    async execute(message, args, data, client) {
        let chance = Math.floor(Math.random() * 9) + 1;
        if (message.author.id == client.ownerID) chance = 4;

        if (chance >= 2 && chance <= 6) {
            const coinsToGive = Math.floor(Math.random() * 100) + 50;
            const array = [
                "Fine, heres some money!",
                "Here, this is all  have on me right now...",
                "Here you go!",
                "I had some extra money, here! :)",
                "Alright, heres some money.",
                "Okay here, don't do anything stupid with it!",
                `Alright, heres $${coinsToGive}.`,
                `All i have on me right now is $${coinsToGive}, you can have it, :)`,
            ];

            let balanceProfile = await Balance.findOne({ userID: message.author.id });
            if (!balanceProfile) {
                balanceProfile = await new Balance({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    balance: 0,
                });
                await balanceProfile.save().catch(err => console.log(err));
            };

            await Balance.findOneAndUpdate({ userID: message.author.id }, { balance: balanceProfile.balance + coinsToGive });
            const successEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} is begging for moneys.`)
                .setDescription(`${array[Math.floor(Math.random() * array.length)]}`)
                .setFooter(`${message.author.tag} got $${coinsToGive}!`)
                .setTimestamp()
                .setColor("GREEN");

            message.channel.send({ embeds: [successEmbed] });
        } else {
            const array = [
                "Sorry, I don't have anything to give you!",
                "No, get away from me beggar!",
                "Sorry, I don't have much money either..",
                "No, I don't trust you with my money.",
                "Get away from me!",
            ];

            const declinedEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} is begging for moneys.`)
                .setDescription(`${array[Math.floor(Math.random() * array.length)]}`)
                .setFooter(`${message.author.tag} failed to beg for moneys..`)
                .setTimestamp()
                .setColor("RED");

            message.channel.send({ embeds: [declinedEmbed] });
        }
    },
};