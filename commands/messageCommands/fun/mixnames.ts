const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: "mixnames",
    description: "Mix 2 names together.",
    async execute(message, args, client) {
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me args split with \`|\`!.`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        const arg = args.join(" ").split(" | ");
        if (!arg[1]) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me args split with \`|\`!`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        const member1 = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === arg[0] || m.user.username.toLowerCase() === arg[0].toLowerCase());
        const member2 = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === arg[1] || m.user.username.toLowerCase() === arg[1].toLowerCase());
        
        if (!member1 || !member2) {
            return message.reply({ content: `Please give 2 valid names!` });
        };

        let name = `${member1.user.username.split("").slice(0, (member1.user.username.length / 2)).join("")}${member2.user.username.split("").slice(0, (member2.user.username.length / 2)).join("")}`
        message.reply({ content: `${name}` });
    },
};