const Discord = require('discord.js');

module.exports = {
    name: "partnerembed",
    aliases: ["pe"],
    async execute(message, args, data, client) {
        if (message.author.id == message.guild.ownerID) {
            const userName = args[0];
            const advertisement = args.slice(1).join(" ");
            if (userName && userName.length > 240) return message.channel.send({ content: "That username is too big for the Discord Embed, sorry!" });
            if (advertisement && advertisement.length > 2048) return message.channel.send({ content: "That advertisement is too big for the Discord Embed, sorry!" });

            if (userName && advertisement) {
                const partnerEmbed = new Discord.MessageEmbed()
                    .setTitle(`New Partner! ${userName}`)
                    .setDescription(`${advertisement}`)
                    .setColor("#47ccff")
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();

                message.channel.send({ embeds: [partnerEmbed] });
                if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
                    message.delete();
                }
            } else {
                message.channel.send({ content: "You need to fill out the required arguments." });
            }
        } else message.channel.send({ content: "You can't use this command as you are not the server owner." });
    },
};