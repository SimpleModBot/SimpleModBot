module.exports = {
    name: "announce",
    cooldown: 5,
    execute(message, args, data, client) {
        if (args[0] == "ENA") return message.reply({ content: 'Give me something to announce.' });
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply({ content: 'You don\'t have manage messages PermissionStatus.' });
        const announcement = args.join(" ");
        message.channel.send({ content: `<a:ANNOUNCEMENT:832059060139982859> ${announcement}` });
        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};