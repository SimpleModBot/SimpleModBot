const Guild = require('../../../database/models/guildSchema.ts');
const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: 'config',
    cooldown: 5,
    description: 'Allows the server owner to change the guild settings.',
    async execute(message, args, data, client) {
        if (message.author.id !== message.guild.ownerID && message.author.id !== '750880076555354185') return message.channel.send({ content: "You do not have permission to use this command as you are not the server owner." });

        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id
            });
            await guildProfile.save().catch(err => Promise.reject(new err));
        };

        if (args[0] == "ENA") {
            const prefix = new MessageEmbed()
                .setTitle("prefix")
                .setDescription(`The current prefix is ${client.prefix}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove prefix <input>\``)
                .setTimestamp()
                .setColor("GREY");

            const muteRoleID = new MessageEmbed()
                .setTitle("muteRoleID")
                .setDescription(`The current muteRole is ${guildProfile.muteRoleID}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove muteRoleID <input>\``)
                .setTimestamp()
                .setColor("GREY");

            const memberRoleID = new MessageEmbed()
                .setTitle("memberRoleID")
                .setDescription(`The current memberRole is ${guildProfile.memberRoleID}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove memberRoleID <input>\``)
                .setTimestamp()
                .setColor("GREY");

            const modlogChannelID = new MessageEmbed()
                .setTitle("modlogChannelID")
                .setDescription(`The current modlogChannel is ${guildProfile.modlogChannelID}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove modlogChannelID <input>\``)
                .setTimestamp()
                .setColor("GREY");

            const levelSystem = new MessageEmbed()
                .setTitle("levelSystem")
                .setDescription(`The current levelSystem is ${guildProfile.levelSystem}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove levelSystem\``)
                .setTimestamp()
                .setColor("GREY");

            const bumpBuddy = new MessageEmbed()
                .setTitle("bumpBuddy")
                .setDescription(`The current bumpBuddy is ${guildProfile.bumpBuddy}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove bumpBuddy\``)
                .setTimestamp()
                .setColor("GREY");

            const bumpRole = new MessageEmbed()
                .setTitle("bumpRole")
                .setDescription(`The current bumpRole is ${guildProfile.bumpRole}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove bumpRole <input>\``)
                .setTimestamp()
                .setColor("GREY");

            let position = 0;
            const pages = [prefix, muteRoleID, memberRoleID, modlogChannelID, levelSystem, bumpBuddy, bumpRole];

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
                    button.reply({ content: `Hey, ${button.user.username}, these buttons aren't for you to use!`, ephemeral: true });
                };
            });

            collector.on("end", async (collected) => {
                await pagination.edit(`Timed out.`, {
                    content: "\u200b",
                    embeds: [pages[position]],
                    components: [endedbuttons]
                });
            });
        } else {
            if ("add" === args[0]) {
                if ("prefix" === args[1]) {
                    if (!args[2]) return message.channel.send({ content: "You did not state a value to update that property to." });
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: args[2], lastEdited: Date.now() });
                    message.channel.send({ content: `Updated: ${args[1]} to ${args[2]} succesfully!` });
                } else if ("muteRole" === args[1]) {
                    if (!args[2]) return message.channel.send({ content: "You did not state a value to update that property to." });
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muteRoleID: args[2], lastEdited: Date.now() });
                    message.channel.send({ content: `Updated: ${args[1]} to ${args[2]} succesfully!` });
                } else if ("memberRole" === args[1]) {
                    if (!args[2]) return message.channel.send({ content: "You did not state a value to update that property to." });
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: args[2], lastEdited: Date.now() });
                    message.channel.send({ content: `Updated: ${args[1]} to ${args[2]} succesfully!` });
                } else if ("modlogChannel" === args[1]) {
                    if (!args[2]) return message.channel.send({ content: "You did not state a value to update that property to." });
                    const modlogChannel = message.mentions.channels.first();
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { modlogChannelID: modlogChannel, lastEdited: Date.now() });
                    message.channel.send(`Updated: ${args[1]} to ${modlogChannel} succesfully!`);
                } else if ("levelSystem" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { levelSystem: true });
                    message.channel.send({ content: "Level System is now toggled on!" });
                } else if ("bumpBuddy" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { bumpBuddy: true });
                    message.channel.send({ content: "bumpBuddy is now toggled on!" });
                } else if ("bumpRole" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { bumpRole: args[2] });
                    message.channel.send({ content: "bumpRole has been changed! Make sure you put a proper role ID!" });
                } else return message.channel.send({ content: "You need to say a property to update." });
            } else if ("remove" === args[0]) {
                if ("prefix" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: "//", lastEdited: Date.now() });
                    message.channel.send({ content: `Deleted ${args[1]} succesfully!` });
                } else if ("muteRole" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muteRoleID: "undefined", lastEdited: Date.now() });
                    message.channel.send({ content: `Deleted ${args[1]} succesfully!` });
                } else if ("memberRole" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: "undefined", lastEdited: Date.now() });
                    message.channel.send({ content: `Deleted ${args[1]} succesfully!` });
                } else if ("modlogChannel" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { modlogChannelID: "undefined", lastEdited: Date.now() });
                    message.channel.send({ content: `Deleted ${args[1]} succesfully!` });
                } else if ("levelSystem" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { levelSystem: false });
                    message.channel.send({ content: "Level System is now toggled off!" });
                } else if ("bumpBuddy" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { bumpBuddy: false });
                    message.channel.send({ content: "bumpBuddy is now toggled off!" });
                } else if ("bumpRole" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { bumpRole: "undefined" });
                    message.channel.send({ content: "bumpRole has been disabled!" });
                } else return message.channel.send({ content: "You need to say a property to delete." });
            } else return message.channel.send({ content: "You need to say if you want to `add` or `remove` a property." });
        };
    },
};