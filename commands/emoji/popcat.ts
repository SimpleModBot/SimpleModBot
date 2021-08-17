module.exports = {
    name: "popcat",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<a:poopcat:789969764155392030>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};