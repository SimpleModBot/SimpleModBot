module.exports = {
    name: "announce",
    cooldown: 5,
    execute(message, args, client) {
        const announcement = args.join(" ");
        message.channel.send(`<a:ANNOUNCEMENT:832059060139982859> ${announcement}`);
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};