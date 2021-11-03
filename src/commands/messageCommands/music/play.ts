const Discord = require('discord.js');

module.exports = {
    name: "play",
    description: "Play a song!",
    cooldown: 10,
    async execute(message, args, data, client) {
        const vc = message.member.voice.channel;
        if (!vc) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("Please join a voice channel first!").setColor('GREY')] });
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ embeds: new Discord.MessageEmbed().setDescription('You aren\'t in the same voice channel as me!').setColor('GREY') });
        if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CONNECT")) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("No permission to connect to that voice channel").setColor('GREY')] });

        if (args[0] == 'ENA') return;
        const query = args.join(" ");
        if (query == 'ENA') return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Please provide a song to play!").setColor('GREY')] });

        let queue = client.player.createQueue(message.guild.id);
        try { await queue.join(vc); } catch (e) {
            await queue.stop();
            return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`An error occured while playing that song or video.\nThis is most likely due to a connection error or the video found being private.\nPlease try again later.`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        };
        let song = await queue.play(query);
        if (song.millisecons > 3600000) return queue.stop(), message.reply({ embeds: [new Discord.MessageEmbed().setDescription('That song is too long to play! Try to keep it under 1 hour.').setColor('GREY')] });

        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Started playing: *\`${song}\`*   *\`|\`*   *\`${song.duration}\`*`).setColor('GREY')] });
    },
};