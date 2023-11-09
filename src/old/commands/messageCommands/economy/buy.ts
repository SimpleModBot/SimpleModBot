const Discord = require('discord.js');
const Inventory = require('../../../database/models/inventorySchema.ts');
const Balance = require('../../../database/models/balanceSchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: "buy",
    cooldown: 5,
    async execute(message, args, data, client) {
        let mentionedMember = message.member.id;

        let inventoryProfile = await Inventory.findOne({ userID: mentionedMember });
        if (!inventoryProfile) {
            inventoryProfile = await new Inventory({
                _id: mongoose.Types.ObjectId(),
                userID: mentionedMember,
                testObject: 0,
                item1: 0,
                item2: 0,
                item3: 0,
                item4: 0,
                item5: 0,
                item6: 0,
                item7: 0,
                item8: 0,
                item9: 0,
                item10: 0,
                item11: 0,
                item12: 0,
                item13: 0,
                item14: 0,
                item15: 0,
                item16: 0,
                item17: 0,
                item18: 0,
                item19: 0,
                item20: 0,
            });
            await inventoryProfile.save().catch(err => console.log(err));
        };
        let balanceProfile = await Balance.findOne({ userID: mentionedMember });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: mentionedMember,
                balance: 0,
            });
            await balanceProfile.save().catch(err => console.log(err));
        };

        let buyingNumber = parseInt(args[1]);
        if (buyingNumber.isNaN) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("The number you want to buy is not valid.").setColor('GREY')] });

        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Please say the ID of which item you would like to buy.").setColor('GREY')] });
        if (args[1] == "ENA") return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Please say the amount you would like to buy of this item.").setColor('GREY')] });

        if (args[0] == "1" && balanceProfile.balance > buyingNumber * 25 - 1) {
            await Balance.findOneAndUpdate({ userID: mentionedMember }, { balance: balanceProfile.balance - (buyingNumber * 25) });
            await Inventory.findOneAndUpdate({ userID: mentionedMember }, { item1: inventoryProfile.item1 + buyingNumber });

            message.channel.send(`Successfully bought \`${buyingNumber}\` of item \`1\`, \`publicTestObject\`, for \`$${buyingNumber * 25}\``);
        } else if (args[0] == "2" && balanceProfile.balance > buyingNumber * 10 - 1) {
            await Balance.findOneAndUpdate({ userID: mentionedMember }, { balance: balanceProfile.balance - (buyingNumber * 10) });
            await Inventory.findOneAndUpdate({ userID: mentionedMember }, { item2: inventoryProfile.item2 + buyingNumber });

            message.channel.send(`Successfully bought \`${buyingNumber}\` of item \`2\`, 🍞\`bread\`, for \`$${buyingNumber * 10}\``);
        } else if (args[0] == "3" && balanceProfile.balance > buyingNumber * 15 - 1) {
            await Balance.findOneAndUpdate({ userID: mentionedMember }, { balance: balanceProfile.balance - (buyingNumber * 15) });
            await Inventory.findOneAndUpdate({ userID: mentionedMember }, { item3: inventoryProfile.item3 + buyingNumber });

            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Successfully bought \`${buyingNumber}\` of item\`3\`, <:blobOwo:852784471819550802>\`Blob Plushie\`, for \`$${buyingNumber * 15}\``).setColor('GREY')] });
        } else message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You do not have enough money to buy this item or it doesn't exist. Please check the shop to see prices and items.").setColor('GREY')] });
    },
};