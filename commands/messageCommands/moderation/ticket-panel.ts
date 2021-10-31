const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "ticket-panel",
    description: "Opens the ticket panel.",
    aliases: ["t-p"],
    cooldown: 5,
    async execute(message, args, data, client) {
        const embed = new MessageEmbed()
            .setTitle('Ticket panel')
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setDescription("**How to make a ticket:**\n" +
                "> Click on the button.\n" +
                "> When the ticket is made you can type in the thread.")
            .setColor('GREY')

        const bt = new MessageActionRow()
            .addComponents(new MessageButton()
                    .setCustomId('tic')
                    .setLabel('🎫 Create Ticket!')
                    .setStyle('PRIMARY'));

        message.channel.send({
            embeds: [embed],
            components: [bt]
        });
    },
};