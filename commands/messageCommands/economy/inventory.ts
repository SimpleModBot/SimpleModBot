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
        
        let position = 0;
        const pages = [inventory1, inventory2];

        const previous = new MessageButton()
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("◀️")
            .setCustomId("previous");

        const next = new MessageButton()
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("▶️")
            .setCustomId("next");

        const paginationbuttons = new MessageActionRow()
            .addComponents(previous, next);

        const endedP = new MessageButton()
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("◀️")
            .setCustomId("previous")
            .setDisabled();

        const endedN = new MessageButton()
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("▶️")
            .setCustomId("previous")
            .setDisabled();

        const endedbuttons = new MessageActionRow()
            .addComponents(endedP, endedN);

        function checkPos() {
            previous.setDisabled(position === 0 ? true : false);
            next.setDisabled(position === Object.keys(pages).length - 1 ? true : false);
        };

        checkPos();
        const pagination = await message.channel.send({
            embeds: [pages[position]],
            components: [paginationbuttons]
        });

        const collector = pagination.componentCollector(
            {
                componentType: "BUTTON",
                time: 60000
            });

        collector.on("collect", async (button) => {
            if (button.user.id === message.author.id) {
                if (button.customId === "previous" && position > 0) position = position - 1;
                if (button.customId === "next" && position < pages.length - 1) position = position + 1;
                checkPos();
                await pagination.edit({
                    content: "\u200b",
                    embeds: [pages[position]],
                    components: [paginationbuttons]
                });
                await button.deferUpdate();
            } else {
                button.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Hey, ${button.user.username}, these buttons aren't for you to use!`).setColor('GREY')], ephemeral: true });
            };
        });

        collector.on("end", async (collected) => {
            await pagination.edit(`Timed out.`, {
                content: "\u200b",
                embeds: [pages[position]],
                components: [endedbuttons]
            });
        });
    },
};