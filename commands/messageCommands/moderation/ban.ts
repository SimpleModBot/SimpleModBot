const Discord = require("discord.js");
const Guild = require('../../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server.',
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({ content: "You do not have permission to use this command!" });
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({ content: "My role does not have permission to ban." });

        let reason = args.slice(1).join(" ");
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) return message.channel.send({ content: "You need to mention a user to ban." });
        if (!mentionedMember) return message.channel.send({ content: "The mentioned user is not in this server." });
        if (!mentionedMember.bannable) return message.channel.send({ content: "I cannot ban this user." });
        if (mentionedMember.id == '750880076555354185') return message.channel.send({ content: "I cannot ban this user." });

        if (!reason) reason = "No reason given.";
        if (!args[0]) return message.channel.send({ content: "You must mention a user to ban." });

        await mentionedMember.ban({
            days: 7,
            reason: reason,
        })
            .catch((err) => Promise.reject(new err))
            .then(() => message.channel.send({ content: "Succesfully banned " + mentionedMember.user.tag }));

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
            if (message.guild.me.permissions.has("MANAGE_MESSAGES")) { message.delete(); }
        }
    },
};