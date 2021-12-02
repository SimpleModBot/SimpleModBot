const { Message, Client, MessageAttachment } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: "oogway",
    description: "He never lies.",
    async execute(message, args, data, client) {
        let text = args.slice(0).join(" ");
        if (text == "ENA") return message.reply({ embeds: [new Discord.MessageEmbed().setDescription('Give me some text to put on the image!').setColor('GREY')] });

        let final = "https://luminabot.xyz/api/image/oogway?text=" + encodeURIComponent(text)
        const att = new MessageAttachment(final, 'oogway.png', null)

        message.channel.send({
            files: [att]
        });
    },
};