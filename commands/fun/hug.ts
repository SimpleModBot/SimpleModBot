const Discord = require('discord.js');

module.exports = {
    name: 'hug',
    description: 'Hugs the user mentioned.',
    async execute(message, args, data, client) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send({ content: "*Heres a hug! :)*" });
        if (!mentionedMember) return message.channel.send({ content: "The member mentioned is not in the server." });

        const hugUEmbed = new Discord.MessageEmbed()
            .setTitle("Someone has been hugged!")
            .setDescription(`*${message.author} hugs ${mentionedMember.user} :)*`)
            .setColor("#7289da");

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
        if (mentionedMember) return message.channel.send({ embeds: [hugUEmbed] });
    },
};