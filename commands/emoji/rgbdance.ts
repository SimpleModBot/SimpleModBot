module.exports = {
    name: "rgbdance",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<a:RGBdance:832059064400740412>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};