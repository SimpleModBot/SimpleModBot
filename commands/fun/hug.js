const Discord = require('discord.js');

module.exports = {
    name: 'hug',
    cooldown: 3,
    description: 'Hugs the user mentioned.',
    async execute(message, args, client) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send("Heres a hug! *hug* :)");
        if (!mentionedMember) return message.channel.send("The member mentioned is not in the server.");

        const hugUEmbed = new Discord.MessageEmbed()
            .setTitle("Someone has been hugged!")
            .setDescription(`${message.author} sent a hug to ${mentionedMember.user}!\n*Hugs ${mentionedMember.user}* :)`)
            .setColor("#7289da");

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) { message.delete(); }
        if (mentionedMember) return message.channel.send(hugUEmbed);
    },
};