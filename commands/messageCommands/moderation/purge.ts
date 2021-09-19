const Discord = require("discord.js");
const Guild = require('../../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: 'purge',
    cooldown: 5,
    description: 'Removes 2-200 messages in the current channel as long as they aren\'t 2 weeks old.',
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You cannot use this command.").setColor('GREY')] });
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I do not have `MANAGE_MESSAGES` permission").setColor('GREY')] });
        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You must state a number of messages to delete.").setColor('GREY')] });
        const amountToDelete = Number(args[0] || 10);

        if (isNaN(amountToDelete)) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Number mentioned is not valid.").setColor('GREY')] });
        if (!Number.isInteger(amountToDelete)) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Number stated must be a whole number.").setColor('GREY')] });
        if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("The number stated must be between 2 and 100.").setColor('GREY')] });
        const fetched = await message.channel.messages.fetch({ limit: amountToDelete, });

        await message.channel.bulkDelete(fetched);
        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Deleted ${amountToDelete} messages succesfully!`).setColor('GREY')] });

        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id
            });
            await guildProfile.save().catch(err => console.log(err));
        };

        const modlogChannel = client.channels.cache.get(guildProfile.modlogChannelID);
        if (modlogChannel == "undefined") return;
        if (modlogChannel) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setTitle(`purge command was used.`)
                .setDescription(`${message.author.tag} purged ${amountToDelete} messages`)
                .setTimestamp()
                .setColor("RED");
            modlogChannel.send({ embeds: [modlogEmbed] });
        }
    },
};