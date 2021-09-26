const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require('canvacord');

module.exports = {
    name: "pixelate",
    description: "Pixelate a pfp.",
    async execute(message, args, client) {
        message.reply({ content: `Editing image...` }).then(async (msg) => {
            let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args.join(" ") || m.user.username.toLowerCase() === args.join(" ").toLowerCase() || m.user.tag.toLowerCase() === args.join(" ").toLowerCase()) || message.member;
            const av = member.user.displayAvatarURL({ dynamic: false, format: "png" });
            const img = await canvacord.Canvas.pixelate(av, Math.floor(Math.random() * 24) + 1);
            const attachment = new MessageAttachment(img, "Edited_photo.png");
            msg.edit({ files: [attachment] });
        });
    },
};