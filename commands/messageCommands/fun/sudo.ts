const Discord = require('discord.js');

module.exports = {
    name: "sudo",
    cooldown: 5,
    async execute(message, args, data, client) {
        if (!message.guild.me.permissions.has("MANAGE_WEBHOOKS")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I need permission to manage webhooks to use this command.").setColor('GREY')] });
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need the manage message permission for this command.").setColor('GREY')] });
        const { sudo } = require('weky');
        const user = message.mentions.members.first();
        if (!user) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to mention a user.").setColor('GREY')] });
        const msg = args.slice(1).join(" ");
        if (args[1] == "ENA") return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I need you to give me some text.").setColor('GREY')] });

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