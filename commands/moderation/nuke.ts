const Discord = require('discord.js');
const Guild = require('../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: 'nuke',
    aliases: ['bomb'],
    description: 'Deletes the current channel and makes a new identical one. (good for deleting really old messages)',
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send({ content: "You can't use this command." });
        if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send({ content: "I do not have permission to MANAGE_CHANNELS." });

        let reason = args.join(" ");
        const nukeChannel = message.channel;

        if (!reason) reason = "No reason given.";
        if (!nukeChannel.deletable) return message.channel.send({ content: "This channel is not deletable." });

        try {
            await nukeChannel.clone();
            await nukeChannel.delete(reason);
        } catch (err) {
            Promise.reject(new err);
        }

        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id
            });
            await guildProfile.save().catch(err => Promise.reject(new err));
        };

        const modlogChannel = client.channels.cache.get(guildProfile.modlogChannelID);
        if (modlogChannel == "undefined") return;
        if (modlogChannel) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setTitle(`nuke command was used.`)
                .setDescription(`${message.author.tag} nuked a channel.`)
                .setTimestamp()
                .setColor("RED");
            modlogChannel.send({ embeds: [modlogEmbed] });
        }
    },
};