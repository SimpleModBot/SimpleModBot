const Discord = require('discord.js');

module.exports = {
    name: "simprate",
    aliases: ["howsimp"],
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let simprate = Math.floor(Math.random() * 101)
        if (user.id == '750880076555354185') simprate = Math.floor(Math.random() * 5);
        if (!user) return message.reply({ content: `Please mention a user in this guild.` })

        const embed = new Discord.MessageEmbed()
            .setTitle(`Simprate.`)
            .setDescription(`${user} is ${simprate}% Simp!`)
            .setTimestamp()

        message.channel.send({ embeds: [embed] })
    },
};