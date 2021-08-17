module.exports = {
    name: "gay",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<a:BelowIsGay:832059060236845067>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};