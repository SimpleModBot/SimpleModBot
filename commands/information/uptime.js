const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'uptime',
    aliases: ['up'],
    description: 'Shows how long the bot has been active for.',
    async execute(message, args, client) {
        const uptimeEmbed = new Discord.MessageEmbed()
            .setTitle("Bot uptime:")
            .setDescription(`\`${ms(client.uptime, { long: true })}\``)
            .setColor("GREEN")
            .setFooter(`${message.author.tag} used uptime command.`);
        message.channel.send(uptimeEmbed);

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};