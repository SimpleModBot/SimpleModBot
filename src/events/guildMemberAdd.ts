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

        const welcomeEmbed = new Discord.MessageEmbed()
            .setTitle('A new user has joined!')
            .setDescription(
                `Everyone welcome ${member.user.tag}!\nIf the server is set up with the verification system you can probably do \`${client.prefix}verify\` to gain access to the server.`,
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
