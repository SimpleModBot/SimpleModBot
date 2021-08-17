module.exports = {
    name: "pingblob",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<:pingblob:832059062849765438>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};