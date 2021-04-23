module.exports = {
    name: "4k",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<:4KULTRAHD:832059060228194365>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};