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
        await queue.join(vc);
        let song = await queue.play(query).catch(a => {
            queue.stop();
        });
        if (song.millisecons > 3600000) return queue.stop(), message.reply({ embeds: [new Discord.MessageEmbed().setDescription('That song is too long to play! Try to keep it under 1 hour.').setColor('GREY')] });
        if (queue.error) return queue.stop(), message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`There was an error while playing the song.`).setColor('GREY')], allowedMentions: { repliedUser: false } });

        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Started playing: *\`${song}\`*   *\`|\`*   *\`${song.duration}\`*`).setColor('GREY')] });
    },
};