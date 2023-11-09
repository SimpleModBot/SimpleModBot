const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: "mixnames",
    aliases: ["mix"],
    description: "Mix 2 names together.",
    async execute(message, args, client) {
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me args split with \` | \`!.`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        const arg = args.join(" ").split(" | ");
        if (!arg[1]) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me args split with \` | \`!`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        const member1 = arg[0];
        const member2 = arg[1];

        if (!member1 || !member2) {
            return message.reply({ content: `Please give 2 valid names!` });
        };

        let name = `${member1.split("").slice(0, (member1.length / 2)).join("")}${member2.split("").slice((member2.length / 2), member2.length).join("")}`
        message.reply({ content: `${name}` });
    },
};