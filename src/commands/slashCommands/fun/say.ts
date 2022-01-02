// @ts-ignore
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
        {
            name: 'devoption',
            description: 'Option for developers. :)',
            type: 'BOOLEAN',
            required: false,
        },
    ],
    async execute(interaction, args, client) {
        const [message] = args;

        const sayEmbed = new Discord.MessageEmbed()
            .setDescription(message.replace('\\n', '\n'))
            .setColor("GREY");

        if (args[1] == true) {
            if (client.devIDs.includes(interaction.member.id)) {
                interaction.channel.send({ embeds: [sayEmbed] });
            } else {
                interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You aren't a developer, therefore you do not have the permission to perform this action.`).setColor('GREY')], ephemeral: true });
            };
        };

        if (args[1] !== true) {
            const channelToSend = await interaction.guild.channels.fetch(args[1]);

            if (channelToSend?.id) {
                if (args[2]) {
                    if (args[2] == true && client.devIDs.includes(interaction.member.id)) {
                        channelToSend.send({ embeds: [sayEmbed] });
                    } else {
                        interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You aren't a developer, therefore you do not have the permission to perform this action.`).setColor('GREY')], ephemeral: true });
                    };
                } else {
                    sayEmbed.setFooter({ text: interaction.member.user.username, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp();
                    channelToSend.send({ embeds: [sayEmbed] });
                };
            } else {
                sayEmbed.setFooter({ text: interaction.member.user.username, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();
                return interaction.channel.send({ embeds: [sayEmbed] });
            };
        };

        if (!interaction.replied == true) interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Your message has been sent.`).setColor('GREY')], ephemeral: true });
    },
};