const Levels = require('discord-xp');
const Discord = require('discord.js');

module.exports = {
    name: 'level',
    cooldown: 3,
    description: 'Says users current level.',
    async execute(message, args, data, client) {
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) mentionedMember = message.member;

        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id);
        if (!target) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('That person does not have any level within the server.').setColor('GREY')] });

        const canvacord = require("canvacord");
        const img = mentionedMember.user.displayAvatarURL({ dynamic: true, size: 1024 });

        const rank = await new canvacord.Rank()
            .setAvatar(img)
            .setCurrentXP(target.xp)
            .setRequiredXP(Levels.xpFor(target.level + 1))
            .setProgressBar("#00c8ff", "COLOR")
            .setUsername(mentionedMember.user.username)
            .setDiscriminator(mentionedMember.user.discriminator);

        const buffer = await rank.build();
        const file = new Discord.MessageAttachment(buffer, "RankCard.png");
        message.channel.send({ files: [file] });
    },
};