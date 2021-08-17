const Discord = require("discord.js");
const Guild = require('../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send({ content: "You cannot use this command." });
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) return message.channel.send({ content: "You need to mention a user to kick." });
        if (!mentionedMember) return message.channel.send({ content: "The member mentioned is not in the server." });
        if (!mentionedMember.kickable) return message.channel.send({ content: "I cannot kick this user." });
        if (mentionedMember.id == '750880076555354185') return message.channel.send({ content: "I cannot kick this user." });

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given";

        try {
            await mentionedMember.kick(reason);
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
                .setTitle(`ban command was used.`)
                .setDescription(`${mentionedMember} was banned for ${reason} by ${message.author.tag}`)
                .setTimestamp()
                .setColor("RED");
            modlogChannel.send({ embeds: [modlogEmbed] });

            if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
                message.delete();
            }
        } else {
            if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
                message.delete();
            }
        }
    },
};