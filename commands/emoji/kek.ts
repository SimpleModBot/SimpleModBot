module.exports = {
    name: "kek",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<a:keka:832059062749102101>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};