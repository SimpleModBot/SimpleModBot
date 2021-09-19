const Discord = require('discord.js');

module.exports = {
    name: "pause",
    description: "Pauses the music.",
    async execute(message, args, data, client) {
        const vc = message.member.voice.channel;
        if (!vc) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("Please join a voice channel first!").setColor('GREY')] });
        if (!client.player.hasQueue(message.guild.id)) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription('There is no queue!').setColor('GREY')] });
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription('Say `true` or `false` if you want to pause or unpause the music!').setColor('GREY')] });

        let bool = true;
        if (args[0] == 'true') bool = true;
        if (args[0] == 'false') bool = false;

        let q = client.player.createQueue(message.guild.id);
        q.setPaused(bool);
        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Paused/unpaused music.`).setColor('GREY')] });
    },
};