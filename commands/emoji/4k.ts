module.exports = {
    name: "4k",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<:4KULTRAHD:832059060228194365>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};