module.exports = {
    name: "play",
    description: "Play a song!",
    async execute(message, args, data, client) {
        const vc = message.member.voice.channel;
        if (!vc) return message.reply({ content: "Please join a voice channel first!" });
        if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CONNECT")) return message.reply({ content: "No permission to connect to that voice channel" });

        if (args[0] == 'ENA') return;
        const query = args.join(" ");
        if (!query) return message.channel.send("Please provide a song to play!");

        let queue = client.player.createQueue(message.guild.id);
        await queue.join(vc);
        let song = await queue.play(query).catch(_ => {
            queue.stop();
        });

        message.channel.send(`Started playing: *\`${song}\`*`);
    },
};