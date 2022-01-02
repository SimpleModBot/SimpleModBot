// @ts-ignore
const { Message, MessageEmbed, Client } = require("discord.js");
// @ts-ignore
const Discord = require("discord.js");
// @ts-ignore
const ms = require('ms');

module.exports = {
    name: "untimeout",
    description: 'Remove the timeout of the mentioned member',
    aliases: ['unmute'],
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(2).join(' ') || 'No reason.';

        if (!message.member.permissions.has('MODERATE_MEMBERS')) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`You are missing the \`TIMEOUT_MEMBERS\` permission.`).setColor('GREY')] });
        if (!message.channel.permissionsFor(message.guild.me).has('MODERATE_MEMBERS')) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`I am missing the \`TIMEOUT_MEMBERS\` permission.`).setColor('GREY')] });
        if (!user) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`You need to mention a user.`).setColor('GREY')] });
        if (user.roles.highest.position > message.member.roles.highest.position || user.roles.highest.position === message.member.roles.highest.position) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`You cannot timeout someone with an equal or higher role.`).setColor('GREY')] });

        const Tembed = new MessageEmbed()
            .setTitle('Timeout')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name: 'Member',
                    value: user.user.tag.toString(),
                    inline: false
                },
                {
                    name: 'Reason',
                    value: `${reason.toString()}`,
                    inline: false
                })
            .setTimestamp()
            .setColor('GREY');

        user.timeout(null, reason);
        message.channel.send({ embeds: [Tembed] });
    },
};