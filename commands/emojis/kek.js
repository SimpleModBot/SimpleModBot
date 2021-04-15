module.exports = {
    name: "kek",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<a:keka:832059062749102101>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};