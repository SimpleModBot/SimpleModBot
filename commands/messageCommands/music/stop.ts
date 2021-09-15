module.exports = {
    name: "stop",
    description: "Stop the music :(",
    async execute(message, args, data, client) {
        const vc = message.member.voice.channel;
        if (!vc) return message.reply({ content: "Please join a voice channel first!" });
        if (!client.player.hasQueue(message.guild.id)) return message.reply({ content: 'There is no queue!' });
        let q = client.player.createQueue(message.guild.id);
        q.stop();
        client.player.deleteQueue(message.guild.id);
        message.channel.send(`Stopped playing music.`);
    },
};