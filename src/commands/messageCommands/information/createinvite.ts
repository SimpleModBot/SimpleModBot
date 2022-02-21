const Discord = require('discord.js');

module.exports = {
    name: "createinvite",
    description: "Creates an invite for a bot.",
    aliases: ['botinvite'],
    cooldown: 5,
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me a bot id!`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        
        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`https://discord.com/oauth2/authorize?client_id=${args[0]}&permissions=8&scope=bot%20applications.commands`).setColor('GREY')] });
    },
};