const Discord = require('discord.js');

module.exports = {
    name: "test",
    aliases: ["t"],
    cooldown: 3,
    devOnly: true,
    async execute(message, args, data, client) {
        // const voice = require("@discordjs/voice");

        // const connection = await voice.joinVoiceChannel({
        //     channelId: message.member.voice.channel.id,
        //     guildId: message.guild.id,
        //     adapterCreator: message.guild.voiceAdapterCreator
        // });

        // const player = voice.createAudioPlayer();
        // const res = voice.createAudioResource('./yo.ogg');
        // res.volume = 75;

        // await connection.subscribe(player);
        // await player.play(res);

        message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`hello`).setColor('GREY')], allowedMentions: { repliedUser: false } });
    },
};