const Discord = require('discord.js');

module.exports = {
    name: 'support',
    description: 'Gives a link to the support/community server',
    DMU: true,
    async execute(message, args, data, client) {
        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("To receive direct support join the support/community server: https://discord.gg/26NtPVvNCU").setColor('GREY')] });
    },
};