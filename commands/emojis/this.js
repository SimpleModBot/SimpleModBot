module.exports = {
    name: "this",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<:this:829818522997620796>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};