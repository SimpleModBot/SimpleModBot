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
                return message.channel.send({ content: "You are already verified." })
            } else {
                message.member.roles.add(memberRole);
                message.channel.send({ content: "You have succesfully been verified in the server!" });
            }
        } else {
            message.reply({ content: "This guild has no member role set, please ask the owner to set it with the command `config`" });
        }
    },
};