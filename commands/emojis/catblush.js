module.exports = {
    name: "catblush",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<:catblushing:832059060579860510>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};