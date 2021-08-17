module.exports = {
    name: "duck",
    execute(message, args, data, client) {
        message.channel.send({ content: "<:shy_duck:830163069786259468>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};