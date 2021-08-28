const Discord = require('discord.js');
const mongis = require('../database/mongoose.ts');
const schema = require('../database/models/guildSchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        await mongis.init();

        if (!message.guild) return;
        if (message.member.permissions.has("MANAGE_GUILD")) return;

        let guildProfile = await schema.findOne({ guildID: message.guild.id });
        if (!guildProfile) return;
        if (guildProfile.antiInvite && guildProfile.antiInvite == false) return;

        function deleteMessage() {
            if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply({ content: "I have anti invite turned on but I do not have the permissions I need to protect you!" });
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
                } catch (err) {
                    deleteMessage();
                };
            };
        };
    },
};