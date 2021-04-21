const Discord = require("discord.js");

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

        try {
            await message.channel.bulkDelete(fetched)
                .then((messages) => message.channel.send(`Deleted ${messages.size} messages succesfully!`));
        } catch (err) {
            const errorChannel = await client.channels.cache.get("832744410998767666");
            const errorMessage = new Discord.MessageEmbed()
                .setTitle("An error has occured!")
                .setDescription(err)
                .setTimestamp()
                .setColor("#ff0a0a");
            errorChannel.send(errorMessage);
            message.channel.send("I was unabe to delete the amount of messages. if they are not within 2 weeks old maybe try the nuke command.");
        }
    },
};