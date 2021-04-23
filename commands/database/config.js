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
                .setDescription(`If there are no properties below it means you haven't added any.\nProperties: prefix, muteRole, memberRole, modlogChannel`)
                .setColor("RED");

            if (guildProfile.prefix) embed.addField(`Prefix:`, guildProfile.prefix);
            if (guildProfile.muteRoleID) embed.addField(`Mute Role ID:`, guildProfile.muteRoleID);
            if (guildProfile.muteRoleID) embed.addField(`Member Role ID:`, guildProfile.memberRoleID);
            if (guildProfile.modlogChannelID) embed.addField(`modlog Channel ID:`, guildProfile.modlogChannelID);
            message.channel.send(embed);
        } else {
            if (!["prefix", "muteRole", "memberRole", "modlogChannel"].includes(args[0])) return message.channel.send("You need to say a property to update.");
            if (!args[1]) return message.channel.send("You did not state a value to update that property to.");
            if ("prefix" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: args[1], lastEdited: Date.now() });
                message.channel.send(`Updated: ${args[0]} to ${args[1]} succesfully!`);
            } else if ("muteRole" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muteRoleID: args[1], lastEdited: Date.now() });
                message.channel.send(`Updated: ${args[0]} to ${args[1]} succesfully!`);
            } else if ("memberRole" === args[0]) {
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: args[1], lastEdited: Date.now() });
                message.channel.send(`Updated: ${args[0]} to ${args[1]} succesfully!`);
            } else if ("modlogChannel" === args[0]) {
                const modlogChannel = message.mentions.channels.first();
                await Guild.findOneAndUpdate({ guildID: message.guild.id }, { modlogChannelID: modlogChannel, lastEdited: Date.now() });
                message.channel.send(`Updated: ${args[0]} to ${modlogChannel} succesfully!`);
            }
        }
    },
};