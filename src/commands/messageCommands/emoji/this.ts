module.exports = {
    name: "this",
    execute(message, args, data, client) {
        message.channel.send({ content: "<:this:829818522997620796>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};