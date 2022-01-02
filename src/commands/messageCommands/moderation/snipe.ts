const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name: 'snipe',
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("MANAGE_MESSAGES") && !message.author.id == client.ownerID) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("You do not have permission to use this.").setColor('GREY')] });

        const snipes = client.snipes.get(message.channel.id);
        if (!snipes) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("There is nothing to snipe!").setColor('GREY')] });

        const snipe = +args[0] - 1 || 0;
        const target = snipes[snipe];
        if (!target) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`There is only ${snipes.length} messages!`).setColor('GREY')] });

        const { msg, time, image } = target;
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(msg.content)
                    .setImage(image)
                    .setFooter({ text: `${moment(time).fromNow()} | ${snipe + 1}/${snipes.length}` })
                    .setColor("GREY")
            ]
        });
    },
};