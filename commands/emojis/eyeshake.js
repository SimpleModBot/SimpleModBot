module.exports = {
    name: "eyeshake",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<:EYESHAKE:832059062937583656>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};