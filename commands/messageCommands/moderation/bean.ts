const Discord = require('discord.js');

module.exports = {
    name: "bean",
    description: "Bean a user.",
    aliases: [],
    cooldown: 5,
    async execute(message, args, data, client) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (args[0] == 'ENA') return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to mention a user to ban.").setColor('GREY')] });
        if (!mentionedMember) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("The mentioned user is not in this server.").setColor('GREY')] });
        if (mentionedMember.id == '750880076555354185') return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I cannot ban this user.").setColor('GREY')] });

        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Succesfully banned " + mentionedMember.user.tag).setColor('GREY')] });
    },
};