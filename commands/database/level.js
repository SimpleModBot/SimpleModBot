const Levels = require('discord-xp');
const Discord = require('discord.js');

module.exports = {
    name: 'level',
    cooldown: 3,
    description: 'Says users current level.',
    async execute(message, args, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) mentionedMember = message.member;

        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id);
        if (!target) return message.channel.send('That person does not have any level within the server.');

        const levelEmbed = new Discord.MessageEmbed()
            .setTitle(`${mentionedMember.user.tag}'s level in ${message.guild}`)
            .addField(`${target.level}`, `XP: ${target.xp}/${Levels.xpFor(target.level + 1)}`)
            .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor("GREY")
            .setTimestamp();
        message.channel.send(levelEmbed);
    },
};