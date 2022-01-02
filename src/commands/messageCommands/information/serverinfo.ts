const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    cooldown: 5,
    async execute(message, args, data, client) {
        const emojicount = message.guild.emojis.cache;
        const roles = message.guild.roles.cache.filter((r) => r.id !== message.guild.id).map((role) => role.toString());
        const create = message.guild.createdAt.toLocaleDateString();
        const channels = message.guild.channels.cache;

        message.channel.send({
            embeds: [new MessageEmbed()
                .setThumbnail(message.guild.iconURL())
                .addFields(
                    {
                        name: `<:BoxCheck:832344817039835146> **INFORMATION**`,
                        value: `**Server Name:** \`${message.guild.name
                            }\`\n**Server Id:** \`${message.guild.id
                            }\`\n**Owner Name:** \`${(await message.guild.fetchOwner()).user.username
                            }\`\n**Owner id:** \`${await message.guild.ownerId}\`\n`,
                    },
                    {
                        name: `<:BoxCheck:832344817039835146> **COUNT**`,
                        value: `**Members:** \`${message.guild.memberCount.toString()}\`\n**Roles:**: \`${roles.length
                            }\`\n**Channels:** \`${channels.size
                            }\`\n**Text Channels:** \`${message.guild.channels.cache
                                .filter((channel) => channel.type === "GUILD_TEXT")
                                .size.toString()}\`\n**Voice Channels:** \`${message.guild.channels.cache
                                    .filter((channel) => channel.type === "GUILD_VOICE")
                                    .size.toString()}\`\n**Emojis:** \`${emojicount.size}\`\n`,
                    },
                    {
                        name: `<:BoxCheck:832344817039835146> **ADDITIONAL INFORMATION**`,
                        value: `**Created At:** \`${create}\`\n**Boost Count** \`${message.guild.premiumSubscriptionCount
                            }\`\n**Boost Level** \`${message.guild.premiumTier.toString()}\`\n**Verification Level** \`${message.guild.verificationLevel.toString()}\`\n`,
                    })
                .setColor("GREY")
                .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })]
        });
    },
};