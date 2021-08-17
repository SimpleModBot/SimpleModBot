module.exports = {
    name: "dogwave",
    cooldown: 5,
    execute(message, args, data, client) {
        message.channel.send({ content: "<:doggowave:832059062883319838>" });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};