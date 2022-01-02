const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "whois",
    aliases: ["userinfo"],
    cooldown: 3,
    async execute(message, args, data, client) {
        const member = message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.member;

        const activities = [];
        let customStatus;

        if (member.presence) for (const activity of member.presence.activities.values()) {
            switch (activity.type) {
                case 'PLAYING':
                    activities.push(`Playing **${activity.name}**`);
                    break;
                case 'LISTENING':
                    if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
                    else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
                    break;
                case 'WATCHING':
                    activities.push(`Watching **${activity.name}**`);
                    break;
                case 'STREAMING':
                    activities.push(`Streaming **${activity.name}**`);
                    break;
                case 'CUSTOM_STATUS':
                    customStatus = activity.state;
                    break;
            };
        };

        const roles = member.roles.highest

        const status = {
            'dnd': `\`Do not disturb\``,
            'idle': `\`Idle\``,
            'offline': `\`Offline\``,
            'online': `\`Online\``
        }

        const bot = {
            'true': "`Yes`",
            'false': "`No`"
        }

        const badges = {
            DISCORD_EMPLOYEE: `DiscordStaff`,
            DISCORD_PARTNER: `DiscordPartner`,
            BUGHUNTER_LEVEL_1: `DiscordBugHunter`,
            BUGHUNTER_LEVEL_2: `DiscordBugHunter2`,
            HYPESQUAD_EVENTS: `HypesqaudEvents`,
            HOUSE_BRAVERY: `HypesquadBravery`,
            HOUSE_BRILLIANCE: `HypesquadBrilliance`,
            HOUSE_BALANCE: `HypesquadBalance`,
            EARLY_SUPPORTER: `EarlySupporter`,
            TEAM_USER: '`Team User`',
            SYSTEM: '`System`',
            VERIFIED_BOT: `VerifiedBot`,
            VERIFIED_DEVELOPER: `BotDev`,
        }

        const flags = await member.user.fetchFlags();
        const userFlags = flags.toArray();

        let num = 'offline';
        if (member.presence) if (member.presence.status) num = member.presence.status;

        const embed = new Discord.MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
            .setTitle(`${member.displayName}'s Information`)
            .addField('Name', `\`${member.user.tag}\``, true)
            .addField('User ID', `\`${member.user.id}\``, true)
            .addField('Nickname', `\`${member.displayName}\``, true)
            .addField('Joined Server At', `\`${moment.utc(member.joinedAt).format('DD/MMM/YYYY')}\``, true)
            .addField('Joined Discord At', `\`${moment.utc(member.user.createdAt).format('DD/MMM/YYYY')}\``, true)
            .addField('Highest Role', `${roles}`, true)
            .addField('User Status', status[num], true)
            .addField('User Is Bot', bot[member.user.bot], true)
        if (userFlags.length <= 0)
            embed.addField('Badges', `\`No Badge\``, true)
        if (userFlags.length > 0)
            embed.addField('Badges', userFlags.map(flag => badges[flag]).join(' '), true)
                .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        if (activities.length <= 0)
            embed.addField(`Activity`, '`Nothing`')
        if (activities.length > 0)
            embed.addField('Activity', `${activities.join('\n')}`);

        message.channel.send({ embeds: [embed] });
    },
};