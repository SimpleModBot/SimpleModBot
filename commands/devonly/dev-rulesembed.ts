const Discord = require('discord.js');

module.exports = {
    name: "dev-rulesembed",
    aliases: ["dre"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        const rules = args.join(" ");
        if (rules && rules.length > 2048) return message.channel.send({ content: "The rules length is too big for the Discord Embeds, sorry!" });

        if (rules) {
            const rulesEmbed = new Discord.MessageEmbed()
                .setTitle(`Rules For The Server.`)
                .setDescription(rules)
                .setColor("RANDOM")
                .setTimestamp();

            message.channel.send({ embeds: [rulesEmbed] });
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            }
        } else {
            message.channel.send({ content: "You need to fill out the required arguments." });
        }
    },
};