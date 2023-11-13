const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord.js');
const Inventory = require('../../../database/models/inventorySchema.ts');
const Balance = require('../../../database/models/balanceSchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: "shop",
    cooldown: 3,
    async execute(message, args, data, client) {
        let mentionedMember = message.member.id;
        let balanceProfile = await Balance.findOne({ userID: mentionedMember });
        if (!balanceProfile) {
            balanceProfile = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: mentionedMember,
                balance: 0,
            });
            await balanceProfile.save().catch(err => console.log(err));
        };

        const shopEmbed1 = new Discord.MessageEmbed()
            .setTitle("Shop Page `1`.")
            .setDescription(`To buy an item use \`${client.prefix}buy itemID Number\`, EX: \`${client.prefix}buy 1 5\`\nThe item ID is right before the name of the item.`)
            .addField("**[1]**`publicTestObject`", "Price: $25\nDescription: Something that will only be here for a limited amount of time and has no purpose..\n⠀")
            .addField("**[2]**`bread`", "Price: $10\nDescription: Some good tasty bread :)")
            .addField("**[3]**`Blob Plushie`", `Price: $15\nDescription: A nice plushie to cuddle with.`)
            .setColor("RANDOM")
            .setTimestamp();
        
        const shopEmbed2 = new Discord.MessageEmbed()
            .setTitle("Shop Page `2`.")
            .setDescription(`To buy an item use \`${client.prefix}buy itemID Number\`, EX: \`${client.prefix}buy 1 5\`\nThe item ID is right before the name of the item.`)
            .addField("There is not enough items in the economy for this page to be used.", "Come back later maybe?")
            .setColor("RANDOM")
            .setTimestamp();
        
        const pages = [shopEmbed1, shopEmbed2];
        client.functions.paginate(message, pages);
    },
};