module.exports = {
    name: "announce",
    cooldown: 5,
    execute(message, args, data, client) {
        const announcement = args.join(" ");
        message.channel.send({ content: `<a:ANNOUNCEMENT:832059060139982859> ${announcement}` });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};