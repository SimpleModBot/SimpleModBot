const Discord = require('discord.js');

module.exports = {
    name: "devwelcome",
    devOnly: true,
    execute(message, args, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) return message.channel.send("There was no mentioned user or ID.");
        
        const welcomeEmbed = new Discord.MessageEmbed()
            .setTitle(`Welcome!`)
            .setDescription(`Everyone welcome ${mentionedMember} to the server!`)
            .setColor("PURPLE")
            .setTimestamp();
        message.channel.send(welcomeEmbed);

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};