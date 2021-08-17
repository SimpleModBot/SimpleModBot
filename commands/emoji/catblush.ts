module.exports = {
    name: "catblush",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<:catblushing:832059060579860510>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};