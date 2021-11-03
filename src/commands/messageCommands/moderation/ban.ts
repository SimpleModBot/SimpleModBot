const Discord = require("discord.js");
const Guild = require('../../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server.',
    async execute(message, args, data, client) {
        if (message.author.id !== client.ownerID) if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You do not have permission to use this command!").setColor('GREY')] });
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("My role does not have permission to ban.").setColor('GREY')] });

        let reason = args.slice(1).join(" ");
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to mention a user to ban.").setColor('GREY')] });
        if (!mentionedMember) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("The mentioned user is not in this server.").setColor('GREY')] });
        if (!mentionedMember.bannable) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I cannot ban this user.").setColor('GREY')] });
        if (mentionedMember.id == '750880076555354185') return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I cannot ban this user.").setColor('GREY')] });

        if (!reason) reason = "No reason given.";
        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You must mention a user to ban.").setColor('GREY')] });

        await mentionedMember.ban({
            days: 7,
            reason: reason,
        })
            .catch((err) => Promise.reject(new err))
            .then(() => message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Succesfully banned " + mentionedMember.user.tag).setColor('GREY')] }));

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