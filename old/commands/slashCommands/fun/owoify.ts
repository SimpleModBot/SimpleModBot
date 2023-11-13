// @ts-ignore
const Discord = require('discord.js');
const owo = require('@zuzak/owo');

module.exports = {
    name: 'owoify',
    description: 'owoify your text.',
    devOnly: false,
    userPermissions: ['SEND_MESSAGES'],
    botPermissions: ['SEND_MESSAGES'],
    options: [
        {
            name: 'text',
            description: 'Text to owoify.',
            type: 'STRING',
            required: true,
        },
    ],
    async execute(interaction, args, client) {
        const [] = args;

        interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`${owo(args[0])}\n\n${owo.translate(args[0])}\u200b`).setColor('GREY')], ephemeral: true });
    },
};