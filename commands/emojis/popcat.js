module.exports = {
    name: "popcat",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<a:poopcat:789969764155392030>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};