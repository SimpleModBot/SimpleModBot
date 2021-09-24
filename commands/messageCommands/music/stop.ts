const Discord = require('discord.js');

module.exports = {
    name: "stop",
    description: "Stop the music :(",
    async execute(message, args, data, client) {
        const vc = message.member.voice.channel;
        if (!vc) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("Please join a voice channel first!").setColor('GREY')] });
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ embeds: new Discord.MessageEmbed().setDescription('You aren\'t in the same voice channel as me!').setColor('GREY') });
        if (!client.player.hasQueue(message.guild.id)) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription('There is no queue!').setColor('GREY')] });
        let q = client.player.createQueue(message.guild.id);
        q.stop();
        client.player.deleteQueue(message.guild.id);
        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Stopped playing music.`).setColor('GREY')] });
    },
};