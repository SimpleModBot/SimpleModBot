const Discord = require('discord.js');
const Guild = require('../../database/models/guildSchema');

module.exports = {
    name: "verify",
    cooldown: 25,
    async execute(message, args, client) {
        const guild = await Guild.findOne({ guildID: message.guild.id });
        const memberRole = await message.guild.roles.cache.get(guild.memberRoleID);
        if (memberRole) {
            if (message.member.roles.cache.has(memberRole)) {
                return message.channel.send("You are already verified.")
            } else {
                message.member.roles.add(memberRole);
                message.channel.send("You have succesfully been verified in the server!");
            }
        } else {
            message.reply("This guild has no member role set, please ask the owner to set it with the command `config`");
        }
    },
};