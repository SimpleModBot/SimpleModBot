const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    cooldown: 5,
    async execute(message, args, data, client) {

        const verificationLevels = {
            NONE: '`None`',
            LOW: '`Low`',
            MEDIUM: '`Medium`',
            HIGH: '`High`',
            VERY_HIGH: '`Very High`'
        };

        const roleCount = await message.guild.roles.cache.size - 1;

        const embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTitle(`${message.guild.name}'s Info`)
            .addField('Name', `\`${message.guild.name}\``, true)
            .addField('ID', `\`${message.guild.id}\``, true)
            .addField('Sever Creation Date', `\`${moment.utc(message.guild.createdAt).format('DD/MMM/YYYY')}\``, true)
            .addField('Verification Level', verificationLevels[message.guild.verificationLevel], true)
            .addField('Rules Channel', (message.guild.rulesChannel) ? `${message.guild.rulesChannel}` : '`None`', true)
            .addField('System Channel', (message.guild.systemChannel) ? `${message.guild.systemChannel}` : '`None`', true)
            .addField('Highest Role', `${message.guild.roles.highest}` + '\u200b', true)
            .addField('Role Count', `\`${roleCount}\` Roles`, true)
            .addField('Emoji Count', `\`${message.guild.emojis.cache.size}\` Emojis`, true)
            .addField('Verified', `\`${message.guild.verified}\``, true)
            .addField('Partnered', `\`${message.guild.partnered}\``, true)
            .addField('AFK Channel', (message.guild.afkChannel) ? `\`${message.guild.afkChannel.name}\`\n\`${message.guild.afkChannel.id}\`` : '`None`', true)
            .addField('AFK Timeout', (message.guild.afkChannel) ? `\`${moment.duration(message.guild.afkTimeout * 1000).asMinutes()} minutes\`` : '`None`', true)
            .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
            .setColor('GREY')
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    },
};