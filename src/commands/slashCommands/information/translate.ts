const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: 'translate',
    description: 'Translates a message.',
    options: [
        {
            name: 'language',
            description: 'Language to which the message should be translated!',
            type: 'STRING',
            required: true
        },
        {
            name: 'message',
            description: 'Message to be translated',
            type: 'STRING',
            required: true
        },
    ],
    async execute(interaction, args, client) {
        const language = interaction.options.getString('language');
        const query = interaction.options.getString('message');

        const translated = await translate(query, { to: `${language}` });
        interaction.reply({ embeds: [new MessageEmbed().setDescription(`${translated.text}`).setColor('GREY')], ephemeral: true });
    },
};