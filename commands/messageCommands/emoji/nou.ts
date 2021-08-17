module.exports = {
    name: "nou",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<a:RGBuno:831196248219975680>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};