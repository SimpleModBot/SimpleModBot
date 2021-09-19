const Discord = require('discord.js');
const Guild = require('../../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: "verify",
    cooldown: 25,
    async execute(message, args, data, client) {
        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id
            });
            await guildProfile.save().catch(err => Promise.reject(new err));
        };

        const memberRole = await message.guild.roles.cache.get(guildProfile.memberRoleID);
        if (memberRole) {
            if (message.member.roles.cache.has(memberRole)) {
                return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You are already verified.").setColor('GREY')] })
            } else {
                message.member.roles.add(memberRole);
                message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You have succesfully been verified in the server!").setColor('GREY')] });
            }
        } else {
            message.reply({ embeds: [new Discord.MessageEmbed().setDescription("This guild has no member role set, please ask the owner to set it with the command `config`").setColor('GREY')] });
        }
    },
};