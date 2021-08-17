module.exports = {
    name: "wheeze",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<:wheeze:831200845147930715>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};