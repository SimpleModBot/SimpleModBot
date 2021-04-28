const Guild = require('../../database/models/guildSchema');
const Discord = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: 'config',
    cooldown: 5,
    description: 'Allows the server owner to change the guild settings.',
    async execute(message, args, client) {
        if (message.author.id !== message.guild.ownerID) return message.channel.send("You do not have permission to use this command as you are not the server owner.");

        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!args.length) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}'s Settings:`)
                .setDescription(
                    `**If there are no settings below it means you haven't added any.**\nProperties: prefix, muteRole, memberRole, modlogChannel
                    \n**Proper usage:**\nconfig add/remove property newProperty`)
                .setColor("RED");

            if (guildProfile.prefix) embed.addField(`Prefix:`, guildProfile.prefix);
            if (guildProfile.muteRoleID !== "undefined") embed.addField(`Mute Role ID:`, guildProfile.muteRoleID);
            if (guildProfile.memberRoleID !== "undefined") embed.addField(`Member Role ID:`, guildProfile.memberRoleID);
            if (guildProfile.modlogChannelID !== "undefined") embed.addField(`modlog Channel ID:`, guildProfile.modlogChannelID);
            message.channel.send(embed);
        } else {
            if ("add" === args[0]) {
                if (!args[2]) return message.channel.send("You did not state a value to update that property to.");
                if ("prefix" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: args[2], lastEdited: Date.now() });
                    message.channel.send(`Updated: ${args[1]} to ${args[2]} succesfully!`);
                } else if ("muteRole" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muteRoleID: args[2], lastEdited: Date.now() });
                    message.channel.send(`Updated: ${args[1]} to ${args[2]} succesfully!`);
                } else if ("memberRole" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: args[2], lastEdited: Date.now() });
                    message.channel.send(`Updated: ${args[1]} to ${args[2]} succesfully!`);
                } else if ("modlogChannel" === args[1]) {
                    const modlogChannel = message.mentions.channels.first();
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { modlogChannelID: modlogChannel, lastEdited: Date.now() });
                    message.channel.send(`Updated: ${args[1]} to ${modlogChannel} succesfully!`);
                } else return message.channel.send("You need to say a property to update.");
            } else if ("remove" === args[0]) {
                if ("prefix" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: "//", lastEdited: Date.now() });
                    message.channel.send(`Deleted ${args[1]} succesfully!`);
                } else if ("muteRole" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muteRoleID: "undefined", lastEdited: Date.now() });
                    message.channel.send(`Deleted ${args[1]} succesfully!`);
                } else if ("memberRole" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: "undefined", lastEdited: Date.now() });
                    message.channel.send(`Deleted ${args[1]} succesfully!`);
                } else if ("modlogChannel" === args[1]) {
                    await Guild.findOneAndUpdate({ guildID: message.guild.id }, { modlogChannelID: "undefined", lastEdited: Date.now() });
                    message.channel.send(`Deleted ${args[1]} succesfully!`);
                } else return message.channel.send("You need to say a property to delete.");
            } else return message.channel.send("You need to say if you want to `add` or `remove` a property.");
        }
    },
};