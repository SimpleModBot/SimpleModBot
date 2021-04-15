module.exports = {
    name: "wheeze",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<:wheeze:831200845147930715>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};