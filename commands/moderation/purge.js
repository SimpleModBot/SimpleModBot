const Discord = require("discord.js");
const Guild = require('../../database/models/guildSchema');

module.exports = {
    name: 'purge',
    description: 'Removes 2-200 messages in the current channel as long as they aren\'t 2 weeks old.',
    async execute(message, args, client) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot use this command.");
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have `MANAGE_MESSAGES` permission");
        if (!args[0]) return message.channel.send("You must state a number of messages to delete.");
        const amountToDelete = Number(args[0], 10);

        if (isNaN(amountToDelete)) return message.channel.send("Number mentioned is not valid.");
        if (!Number.isInteger(amountToDelete)) return message.channel.send("Number stated must be a whole number.");
        if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send("The number stated must be between 2 and 100.");
        const fetched = await message.channel.messages.fetch({ limit: amountToDelete, });

        await message.channel.bulkDelete(fetched)
            .then((messages) => message.channel.send(`Deleted ${messages.size} messages succesfully!`))
            .then(msg => setTimeout(() => {
                msg.delete();
            }, 5000));
        
        const guild = await Guild.findOne({ guildID: message.guild.id });
        const modlogChannel = client.channels.cache.get(guild.modlogChannelID);
        if (modlogChannel == "undefined") return;
        if (modlogChannel) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setTitle(`purge command was used.`)
                .setDescription(`${message.author.tag} purged ${amountToDelete} messages`)
                .setTimestamp()
                .setColor("RED");
            modlogChannel.send(modlogEmbed);
        }
    },
};