const Discord = require('discord.js');
const Guild = require('../../database/models/guildSchema');

module.exports = {
    name: "test",
    async execute(message, args, client) {
        const guild = await Guild.findOne({ guildID: message.guild.id });
        const modlogChannel = client.channels.cache.get(guild.modlogChannelID);
        if (modlogChannel) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setTitle(`NAME command was used.`)
                .setDescription(`${mentionedMember} was TEXT for ${reason} by ${message.author.tag}`)
                .setTimestamp()
                .setColor("RED");
            modlogChannel.send(modlogEmbed);

            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            }
        } else {
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            }
        }
    },
};