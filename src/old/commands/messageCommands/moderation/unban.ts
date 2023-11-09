const Discord = require("discord.js");
const Guild = require('../../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: 'unban',
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You do not have permission to use this command!").setColor('GREY')] });
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I do not have permission to ban users.").setColor('GREY')] });

        let reason = args.slice(1).join(" ");
        let userID = args[0];

        if (!reason) reason = "No reason given.";
        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You must mention a user to unban.").setColor('GREY')] });
        if (isNaN(args[0])) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("The ID mentioned is not valid").setColor('GREY')] });

        message.guild.fetchBans().then(async (bans) => {
            if (bans.size == 0) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("This server does not have anyone banned").setColor('GREY')] });
            let bUser = bans.find((b) => b.user.id == userID);
            if (!bUser) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("The user ID mentioned is not banned.").setColor('GREY')] });
            await message.guild.members.unban(bUser.user, reason).catch((err) => {
                Promise.reject(new err);
            }).then(() => {
                message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Succesfully Unbanned ${args[0]}`).setColor('GREY')] });
            });
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
                    .setTitle(`unban command was used.`)
                    .setDescription(`${args[0]} was unbanned for **${reason}** by ${message.author.tag}`)
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
        });
    },
};