const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js")
const canvacord = require('canvacord');

module.exports = {
    name: "clyde",
    description: "Clyde some text!",
    async execute(message, args, data, client) {
        if (!args.length) {
            return message.reply({ content: `Please supply give me text!` });
        };

        message.reply({ content: `Clydeifying your text...` }).then(async (msg) => {
            let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args.join(" ") || m.user.username.toLowerCase() === args.join(" ").toLowerCase() || m.user.tag.toLowerCase() === args.join(" ").toLowerCase()) || message.member;
            const img = await canvacord.Canvas.clyde(args.join(" "));
            const attachment = new MessageAttachment(img, "Edited_photo.png");
            msg.edit({files: [attachment] });
        });
    },
};