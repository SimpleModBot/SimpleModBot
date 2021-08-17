module.exports = {
    name: "eyeshake",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<:EYESHAKE:832059062937583656>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};