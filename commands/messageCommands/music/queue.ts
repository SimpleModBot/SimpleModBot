const Discord = require('discord.js');

module.exports = {
    name: "queue",
    description: "Check song queue.",
    async execute(message, args, data, client) {
        const vc = message.member.voice.channel;
        if (!vc) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("Please join a voice channel first!").setColor('GREY')] });
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ embeds: new Discord.MessageEmbed().setDescription('You aren\'t in the same voice channel as me!').setColor('GREY') });
        if (!client.player.hasQueue(message.guild.id)) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription('There is no queue!').setColor('GREY')] });

        const queue = client.player.getQueue(message.guild.id);
        const embed = new Discord.MessageEmbed()
            .setTitle("Queue:")
            .setColor('GREY')
            .setTimestamp();
        
        if (queue.songs[0]) embed.addField('1) ' + queue.songs[0].name, queue.songs[0].url), embed.setThumbnail(queue.songs[0].thumbnail);
        if (queue.songs[1]) embed.addField('2) ' + queue.songs[1].name, queue.songs[1].url);
        if (queue.songs[2]) embed.addField('3) ' + queue.songs[2].name, queue.songs[2].url);
        if (queue.songs[4]) embed.addField('4) ' + queue.songs[4].name, queue.songs[4].url);
        if (queue.songs[3]) embed.addField('5) ' + queue.songs[3].name, queue.songs[3].url);

        message.channel.send({ embeds: [embed] });
    },
};