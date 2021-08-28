const Discord = require("discord.js");
const Guild = require('../../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: 'purge',
    cooldown: 5,
    description: 'Removes 2-200 messages in the current channel as long as they aren\'t 2 weeks old.',
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ content: "You cannot use this command." });
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ content: "I do not have `MANAGE_MESSAGES` permission" });
        if (!args[0]) return message.channel.send({ content: "You must state a number of messages to delete." });
        const amountToDelete = Number(args[0] || 10);

        if (isNaN(amountToDelete)) return message.channel.send({ content: "Number mentioned is not valid." });
        if (!Number.isInteger(amountToDelete)) return message.channel.send({ content: "Number stated must be a whole number." });
        if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send({ content: "The number stated must be between 2 and 100." });
        const fetched = await message.channel.messages.fetch({ limit: amountToDelete, });

        await message.channel.bulkDelete(fetched);
        message.channel.send({ content: `Deleted ${amountToDelete} messages succesfully!` });

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