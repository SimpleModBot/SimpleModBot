const Discord = require('discord.js');

module.exports = {
    name: "gayrate",
    aliases: ["howgay"],
    cooldown: 3,
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let gayrate = Math.floor(Math.random() * 101);
        if (user.id == '750880076555354185') gayrate = Math.floor(Math.random() * 5);

        if (!user) return message.reply({ content: `Please provide a valid user from this guild.` })

        const embed = new Discord.MessageEmbed()
            .setTitle(`Gayrate For ${user.user.tag}`)
            .setDescription(`${user} is ${gayrate}% gay!`)
            .setTimestamp()
            .setColor("RANDOM");

        message.channel.send({ embeds: [embed] });

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    }
}