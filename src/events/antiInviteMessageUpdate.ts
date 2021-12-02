const Discord = require('discord.js');
const schema = require('../database/models/guildSchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: 'antiInviteMessageUpdate',
    async execute(msg, message, client) {
        if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;

        if (!message.guild) return;
        if (message.author.bot) return;
        if (message.member.permissions.has("MANAGE_GUILD")) return;

        let guildProfile = await schema.findOne({ guildID: message.guild.id });
        if (!guildProfile) return;
        if (!guildProfile.antiInvite) return;
        if (guildProfile.antiInvite !== true) return;

        function deleteMessage() {
            if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("I have anti invite turned on but I do not have the permissions I need to protect you!").setColor('GREY')] });
            message.delete();
            message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle("Anti Invite.")
                    .setDescription(`${message.author.tag} sent an invite!`)
                    .setColor("GREY")
                    .setTimestamp()]
            });
        };

        const links = ['discord.gg/', 'discord.com/invite/'];

        for (const link of links) {
            if (!message.content.includes(link)) return;

            const code = message.content.split(link)[1].split(" ")[0];
            const isGuildInvite = message.guild.invites.cache.has(code);

            if (!isGuildInvite) {
                try {
                    const vanity = await message.guild.fetchVanityData();
                    if (code !== vanity?.code) return deleteMessage();
                    await client.channels.cache.get('915827131534168105').send({ embeds: [new Discord.MessageEmbed().setDescription(`${message.author}(${message.author.tag}) was attacked by anti invite in ${message.channel}!`).setColor('GREY').setTimestamp()] });
                } catch (err) {
                    deleteMessage();
                    await client.channels.cache.get('915827131534168105').send({ embeds: [new Discord.MessageEmbed().setDescription(`${message.author}(${message.author.tag}) was attacked by anti invite in ${message.channel}!`).setColor('GREY').setTimestamp()] });
                };
            };
        };
    },
};