const Discord = require('discord.js');

module.exports = {
    name: "welcome",
    cooldown: 3,
    execute(message, args, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) return message.channel.send("There was no mentioned user or ID.");
        
        const welcomeEmbed = new Discord.MessageEmbed()
            .setTitle(`Welcome!`)
            .setDescription(`${message.author} welcomes ${mentionedMember} to the server!`)
            .setColor("GREEN")
            .setTimestamp();
        message.channel.send(welcomeEmbed);

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};