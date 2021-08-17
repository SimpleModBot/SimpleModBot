const Discord = require("discord.js");

module.exports = {
    name: 'social',
    description: 'Displays my social medias.',
    aliases: ['links', 'link'],
    DMU: true,
    async execute(message, args, data, client) {
        const socialEmbed = new Discord.MessageEmbed()
            .setTitle("My Links/Social Medias.")
            .addField("Twitch: https://twitch.tv/deathb4defeet", "** **")
            .addField("Discord: https://discord.gg/26NtPVvNCU", "Testing Server: https://discord.gg/yfcvPmxkmR", "** **")
            .addField("Top.gg Invite: https://top.gg/bot/808196506833125396", "** **")
            .setColor("#ff0800")
            .setTimestamp();

        message.channel.send({ embeds: [socialEmbed] });

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};