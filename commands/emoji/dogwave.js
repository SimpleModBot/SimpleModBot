module.exports = {
    name: "dogwave",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<:doggowave:832059062883319838>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};