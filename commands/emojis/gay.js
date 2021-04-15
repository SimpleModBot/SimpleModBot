module.exports = {
    name: "gay",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<a:BelowIsGay:832059060236845067>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};