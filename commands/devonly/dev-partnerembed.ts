const Discord = require('discord.js');

module.exports = {
    name: "dev-partnerembed",
    aliases: ["dpe"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        const userName = args[0];
        const advertisement = args.slice(1).join(" ");
        if (userName && userName.length > 240) return message.channel.send({ content: "That username is too big for the Discord Embed, sorry!" });
        if (advertisement && advertisement.length > 2048) return message.channel.send({ content: "That advertisement is too big for the Discord Embeds, sorry!" });

        if (userName && advertisement) {
            const partnerEmbed = new Discord.MessageEmbed()
                .setTitle(`New Partner! ${userName}`)
                .setDescription(`${advertisement}`)
                .setColor("#47ccff")
                .setTimestamp();

            message.channel.send({ embeds: [partnerEmbed] });
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            }
        } else {
            message.channel.send({ content: "You need to fill out the required arguments." });
        }
    },
};