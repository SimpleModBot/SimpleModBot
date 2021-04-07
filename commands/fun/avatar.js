const Discord = require("discord.js");

module.exports = {
    name: 'avatar',
    description: 'Displays a users avatar.',
    async execute(message, args, client) {

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) return;

        const embed = new Discord.MessageEmbed()
            .setTitle(mentionedMember.user.tag + "'s Avatar")
            .setImage(mentionedMember.user.displayAvatarURL({ dynamic: true }));

        message.channel.send(embed);

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};