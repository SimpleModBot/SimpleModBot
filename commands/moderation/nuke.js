

module.exports = {
    name: 'nuke',
    cooldown: 60,
    aliases: ['bomb'],
    description: 'Deletes the current channel and makes a new identical one. (good for deleting really old messages)',
    async execute(message, args, client) {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You can't use this command.");
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I do not have permission to MANAGE_CHANNELS.");

        let reason = args.join(" ");
        const nukeChannel = message.channel;

        if (!reason) reason = "No reason given.";
        if (!nukeChannel.deletable)
            return message.channel.send("This channel is not deletable.");

        await nukeChannel.clone().catch((err) => console.log(err));
        await nukeChannel.delete(reason).catch((err) => console.log(err));
    },
};