const Discord = require('discord.js');

module.exports = {
    name: 'say',
    description: 'No description.',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    options: [
        {
            name: 'message',
            description: 'What you would like to say.',
            type: 'STRING',
            required: true,
        },
        {
            name: 'channel',
            description: 'The channel you would like to send the message in.',
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
            required: false,
        },
    ],
    async execute(interaction, args, client) {
        const [message, channel] = args;
        if (channel) {
            const channelToSend = await interaction.guild.channels.fetch(channel);
            if (channelToSend) {
                channelToSend.send({ content: message });
            } else {
                return interaction.reply({ content: 'Invalid channel.', ephemeral: true });
            }
        } else {
            interaction.channel.send({ content: message });
        };

        interaction.reply({ content: `Message sent.`, ephemeral: true });
    },
};