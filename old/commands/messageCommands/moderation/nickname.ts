const Discord = require('discord.js');
const Guild = require('../../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: 'nickname',
    aliases: ['nick'],
    description: 'Nicknames the user with what you say',
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("CHANGE_NICKNAME") && message.author.id !== '750880076555354185') return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You cannot use this command.").setColor('GREY')] });
        if (!message.guild.me.permissions.has("MANAGE_NICKNAMES")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I do not have the ability to MANAGE_NICKNAMES.").setColor('GREY')] });

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const nickName = args.slice(1).join(" ");

        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You must mention a member to change their nickname.").setColor('GREY')] });
        if (!mentionedMember) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("The user mentioned is not in this server.").setColor('GREY')] });
        if (!nickName) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You must say a nickname for this member.").setColor('GREY')] });
        if (!mentionedMember.kickable) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I cannot change this users nickname because they are higher than my role").setColor('GREY')] });

        await mentionedMember.setNickname(nickName).catch((err) => Promise.reject(new err).then(message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I am unable to add this username due to an error.").setColor('GREY')] })));
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
                .setTitle(`nickname command was used.`)
                .setDescription(`${mentionedMember} was nicknamed ${nickName} by ${message.author.tag}`)
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