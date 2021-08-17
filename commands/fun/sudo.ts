module.exports = {
    name: "sudo",
    cooldown: 5,
    async execute(message, args, data, client) {
        if (!message.guild.me.permissions.has("MANAGE_WEBHOOKS")) return message.channel.send({ content: "I need permission to manage webhooks to use this command." });
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ content: "You need the manage message permission for this command." });
        const { sudo } = require('weky');
        const user = message.mentions.members.first();
        if (!user) return message.channel.send({ content: "You need to mention a user." });
        const msg = args.slice(1).join(" ");
        if (args[1] == "ENA") return message.channel.send({ content: "I need more text." });

        const xd = new sudo({
            message: message,
            text: msg,
            member: user,
        });

        xd.start();

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};