const Discord = require('discord.js');

module.exports = {
    name: "dev-embed",
    aliases: ["de"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        const title = args[0];
        const description = args.slice(1).join(" ");
        if (description && description.length > 2048) return message.channel.send({ content: "That description is too big for the Discord Embeds, sorry!" });

        if (title && description) {
            const embed = new Discord.MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor("RANDOM")
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            }
        } else {
            message.channel.send({ content: "You need to fill out the required arguments." });
        }
    },
};