const Discord = require('discord.js');

module.exports = {
    name: "gayrate",
    aliases: ["howgay"],
    cooldown: 3,
    async execute(message, args, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let gayrate = Math.floor(Math.random() * 101);
        if (user.id == '750880076555354185') gayrate = Math.floor(Math.random() * 5);

        if (!user) return message.reply(`Please provide a valid user from this guild.`)

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} wants to know\nhow gay ${user.user.tag} is.`)
            .setDescription(`${user} is ${gayrate}% gay!`)
            .setTimestamp()
            .setColor("RANDOM");
        message.channel.send(embed)

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    }
}