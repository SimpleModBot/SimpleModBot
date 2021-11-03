const Discord = require('discord.js');

module.exports = {
    name: 'uptime',
    aliases: ['up'],
    description: 'Shows how long the bot has been active for.',
    async execute(message, args, data, client) {
        let Days = Math.floor(client.uptime / 86400000);
        let Hours = Math.floor(client.uptime / 3600000) % 24;
        let Minutes = Math.floor(client.uptime / 60000) % 60;
        let Seconds = Math.floor(client.uptime / 1000) % 60;
        const RemoveUseless = (Duration) => {
            return Duration.replace("0 Day\n", "").replace("0 Hour\n", "").replace("0 Minute\n", "");
        };

        let Uptime = await RemoveUseless(`\`${Days}\` ${Days > 1 ? "Days" : "Day"} \`${Hours}\` ${Hours > 1 ? "Hours" : "Hour"} \`${Minutes}\` ${Minutes > 1 ? "Minutes" : "Minute"} \`${Seconds}\` ${Seconds > 1 ? "Seconds" : "Second"}`);

        const uptimeEmbed = new Discord.MessageEmbed()
            .setTitle("Bot uptime:")
            .setDescription(`${Uptime}`)
            .setColor("GREEN")
            .setFooter(`${message.author.tag} used uptime command.`);

        message.channel.send({ embeds: [uptimeEmbed] });

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};