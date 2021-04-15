module.exports = {
    name: "rgbdance",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<a:RGBdance:832059064400740412>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};