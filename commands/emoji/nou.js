module.exports = {
    name: "nou",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<a:RGBuno:831196248219975680>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};