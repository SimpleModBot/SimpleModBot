module.exports = {
    name: "pingblob",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<:pingblob:832059062849765438>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};