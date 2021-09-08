const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    cooldown: 5,
    async execute(message, args, data, client) {
        const region = {
            'us-central': `\`US Central\``,
            'us-east': `\`US East\``,
            'us-south': `\`US South\``,
            'us-west': `\`US West\``,
            'europe': `\`Europe\``,
            'singapore': `\`Singapore\``,
            'japan': `\`Japan\``,
            'russia': `\`Russia\``,
            'hongkong': `\`Hong Kong\``,
            'brazil': `\`Brazil\``,
            'sydney': `\`Sydney\``,
            'southafrica': `\`South Africa\``,
            'india': `\`India\``
        };

        const verificationLevels = {
            NONE: '`None`',
            LOW: '`Low`',
            MEDIUM: '`Medium`',
            HIGH: '`High`',
            VERY_HIGH: '`Very High`'
        };

        const notifications = {
            ALL: '`All`',
            MENTIONS: '`Mentions`'
        };

        const roleCount = message.guild.roles.cache.size - 1;
        const members = message.guild.members.cache.array();
        const memberCount = members.length;
        const online = members.filter((m) => m.presence.status === 'online').length;
        const offline = members.filter((m) => m.presence.status === 'offline').length;
        const dnd = members.filter((m) => m.presence.status === 'dnd').length;
        const afk = members.filter((m) => m.presence.status === 'idle').length;
        const bots = members.filter(b => b.user.bot).length;
        const humans = memberCount - bots;

        const channels = message.guild.channels.cache.array();
        const channelCount = channels.length - channels.filter(c => c.type === 'category').length;
        const textChannels = channels.filter(c => c.type === 'text').length;
        const voiceChannels = channels.filter(c => c.type === 'voice').length;
        const newsChannels = channels.filter(c => c.type === 'news').length;
        const storeChannel = channels.filter(c => c.type === 'store').length;
        const categoryChannels = channels.filter(c => c.type === 'category').length;

        const embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTitle(`${message.guild.name}'s Info`)
            .addField('Name', `\`${message.guild.name}\``, true)
            .addField('ID', `\`${message.guild.id}\``, true)
            .addField('Server Owner', `${message.guild.owner}`, true)
            .addField('Users Count', `\`${memberCount}\` Total Users\n\`${humans}\` Humans\n\`${bots}\` Bots`, true)
            .addField('Server Region', region[message.guild.region], true)
            .addField('Sever Creation Date', `\`${moment.utc(message.guild.createdAt).format('DD/MMM/YYYY')}\``, true)
            .addField('Verification Level', verificationLevels[message.guild.verificationLevel], true)
            .addField('Rules Channel', (message.guild.rulesChannel) ? `${message.guild.rulesChannel}` : '`None`', true)
            .addField('System Channel', (message.guild.systemChannel) ? `${message.guild.systemChannel}` : '`None`', true)
            .addField('Highest Role', message.guild.roles.highest, true)
            .addField('Role Count', `\`${roleCount}\` Roles`, true)
            .addField('Emoji Count', `\`${message.guild.emojis.cache.size}\` Emojis`, true)
            .addField('Category Count', `\`${categoryChannels}\` Categories`, true)
            .addField('Verified', `\`${message.guild.verified}\``, true)
            .addField('Partnered', `\`${message.guild.partnered}\``, true)
            .addField('Default Notifications', notifications[message.guild.defaultMessageNotifications], true)
            .addField('AFK Channel', (message.guild.afkChannel) ? `\`${message.guild.afkChannel.name}\`\n\`${message.guild.afkChannel.id}\`` : '`None`', true)
            .addField('AFK Timeout', (message.guild.afkChannel) ? `\`${moment.duration(message.guild.afkTimeout * 1000).asMinutes()} minutes\`` : '`None`', true)
            .addField('Channel Counts', `\`${channelCount}\` Total Channels || ⌨\`${textChannels}\` | 🔊\`${voiceChannels}\` | 📢\`${newsChannels}\` | 🛒\`${storeChannel}\``)
            .addField('User Status', `\`${online}\` Online, \`${afk}\` AFK, \`${dnd}\` DND, \`${offline}\` Offline`)
            .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    },
};