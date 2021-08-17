const Discord = require('discord.js');

module.exports = {
    name: "rulesembed",
    async execute(message, args, data, client) {
        if (message.author.id == message.guild.ownerID) {
            const rules = args.join(" ");
            if (rules && rules.length > 2048) return message.channel.send({ content: "The rules length is too big for the Discord Embeds, sorry!" });

            if (rules) {
                const rulesEmbed = new Discord.MessageEmbed()
                    .setTitle(`Rules For The Server.`)
                    .setDescription(rules)
                    .setColor("RANDOM")
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();

                message.channel.send({ embeds: [rulesEmbed] });
                if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
                    message.delete();
                }
            } else {
                message.channel.send({ content: "You need to fill out the required arguments." });
            }
        } else message.channel.send({ content: "You are not the owner of this server so you cant use this command." });
    },
};