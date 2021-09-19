const Discord = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: "slap",
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!user) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Please mention a user or id from this guild.`).setColor('GREY')] })
        const avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });

        new DIG.Batslap().getImage(message.member.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 }), avatar);

        let img = await new DIG.Batslap().getImage(message.member.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 }), avatar);
        let attach = new Discord.MessageAttachment(img, "slap.png");
        message.channel.send({ files: [attach] })
    },
};