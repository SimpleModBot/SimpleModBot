const Discord = require("discord.js");

module.exports = {
    name: 'social',
    aliases: ['links', 'link'],
    description: 'Displays my social medias.',
    async execute(message, args, client) {

        const socialEmbed = new Discord.MessageEmbed()
            .setTitle("My Links/Social Medias.")
            .addField("Twitch: https://twitch.tv/deathb4defeet", "** **")
            .addField("Discord: https://discord.gg/26NtPVvNCU", "Testing Server: https://discord.gg/yfcvPmxkmR", "** **")
            .addField("Top.gg Invite: https://top.gg/bot/808196506833125396", "** **")
            .setColor("#ff0800")
            .setTimestamp();

        message.channel.send(socialEmbed);

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};