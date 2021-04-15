module.exports = {
    name: "duck",
    cooldown: 5,
    execute(message, args, client) {
        message.channel.send("<:shy_duck:830163069786259468>");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};