const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord.js');
const Inventory = require('../../../database/models/inventorySchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: "inventory",
    aliases: ["inv"],
    async execute(message, args, data, client) {
        let mentionedMember = message.member.id;

        let inventoryProfile = await Inventory.findOne({ userID: mentionedMember });
        if (!inventoryProfile) {
            inventoryProfile = await new Inventory({
                _id: mongoose.Types.ObjectId(),
                userID: mentionedMember
            });
            await inventoryProfile.save().catch(err => console.log(err));
        };
        
        const inventory1 = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}'s inv1.`)
            .addField("`testObject`", `**${inventoryProfile.testObject}**`)
            .addField("`publicTestObject`", `**${inventoryProfile.item1}**`)
            .addField("🍞`bread`", `**${inventoryProfile.item2}**`)
            .addField("<:blobOwo:852784471819550802>`Blob Plushie`", `**${inventoryProfile.item3}**`)
            .setColor("RANDOM")
            .setTimestamp();
        
        const inventory2 = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}'s inv2.`)
            .addField("There is not enough items in the economy for this page to be used.", "Come back later maybe?")
            .setColor("RANDOM")
            .setTimestamp();
        
        const pages = [inventory1, inventory2];
        client.paginate(message, pages);
    },
};