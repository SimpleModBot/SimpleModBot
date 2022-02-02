const Discord = require('discord.js');
const mongis = require('../database/mongoose.ts');
const schema = require('../database/models/guildSchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        let guildProfile = await schema.findOne({ guildID: member.guild.id });
        if (!guildProfile) return;
        if (!guildProfile.welcomeChannelID) return;
        const welcomechannel = await member.guild.channels.cache.get(
            guildProfile.welcomeChannelID,
        );
        if (!welcomechannel) return;

        let desc = `Everyone welcome ${member.user.tag}!`;
        if (guildProfile.memberRoleID) desc += `\n\nIt appears this guild might be set up with my verification system.\nYou can gain the member role by completing the captcha after using the \`${client.prefix}verify\` command.`;

        const welcomeEmbed = new Discord.MessageEmbed()
            .setTitle('A new user has joined!')
            .setDescription(
                desc,
            )
            .setTimestamp()
            .setColor('GREY');

        if (
            welcomechannel
                .permissionsFor(member.guild.me)
                .has(['SEND_MESSAGES'])
        )
            welcomechannel.send({
                content: 'Welcome!',
                embeds: [welcomeEmbed],
            });
    },
};
