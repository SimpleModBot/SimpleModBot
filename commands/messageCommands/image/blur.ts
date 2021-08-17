const Discord = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: "blur",
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!user) return message.reply({ content: `Please mention a user from this guild.` })

        const avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });
        new DIG.Blur().getImage(avatar, 43);
        let img = await new DIG.Blur().getImage(avatar);
        let attach = new Discord.MessageAttachment(img, "affect.png");

        message.channel.send({ files: [attach] })
    }
}