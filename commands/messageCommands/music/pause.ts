module.exports = {
    name: "pause",
    description: "Pauses the music.",
    async execute(message, args, data, client) {
        const vc = message.member.voice.channel;
        if (!vc) return message.reply({ content: "Please join a voice channel first!" });
        if (!client.player.hasQueue(message.guild.id)) return message.reply({ content: 'There is no queue!' });
        if (args[0] == 'ENA') return message.reply({ content: 'Say `true` or `false` if you want to pause or unpause the music!' });

        let bool = true;
        if (args[0] == 'true') bool = true;
        if (args[0] == 'false') bool = false;

        let q = client.player.createQueue(message.guild.id);
        q.setPaused(bool);
        message.channel.send(`Paused/unpaused music.`);
    },
};