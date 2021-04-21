const Discord = require("discord.js");

module.exports = {
    name: 'vote',
    aliases: ['poll'],
    description: 'Creates a poll in the current channel.',
    async execute(message, args, client) {

        const filter = (m) => m.author.id == message.author.id;
        const embed = new Discord.MessageEmbed().setFooter(`Vote made by ${message.author.tag}`);

        message.channel.send("What is the vote Topic?");
        try {
            let msg = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 15000,
                errors: ["time"],
            });
            embed.setTitle(msg.first().content);
        } catch (err) {
            const errorChannel = await client.channels.cache.get("832744410998767666");
            const errorMessage = new Discord.MessageEmbed()
                .setTitle("An error has occured!")
                .setDescription(err)
                .setTimestamp()
                .setColor("#ff0a0a");
            errorChannel.send(errorMessage);
            message.channel.send("You ran out of time, Redo the command to retry.");
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            }
        }

        message.channel.send("What is the first thing to vote for?");
        try {
            let msg = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 15000,
                errors: ["time"],
            });
            embed.addField(`[🔴] The first option to vote for:`, msg.first().content);
        } catch (err) {
            const errorChannel = await client.channels.cache.get("832744410998767666");
            const errorMessage = new Discord.MessageEmbed()
                .setTitle("An error has occured!")
                .setDescription(err)
                .setTimestamp()
                .setColor("#ff0a0a");
            errorChannel.send(errorMessage);
            message.channel.send("You ran out of time, redo the command to retry.");
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            }
        }

        message.channel.send("What is the second thing to vote for?");
        try {
            let msg = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 15000,
                errors: ["time"],
            });
            embed.addField(
                `[🔵] The second option to vote for:`,
                msg.first().content
            );
        } catch (err) {
            const errorChannel = await client.channels.cache.get("832744410998767666");
            const errorMessage = new Discord.MessageEmbed()
                .setTitle("An error has occured!")
                .setDescription(err)
                .setTimestamp()
                .setColor("#ff0a0a");
            errorChannel.send(errorMessage);
            message.channel.send("You ran out of time, Redo the command to retry.");
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            }
        }
        message.channel
            .send(embed)
            .then((sentMessage) => sentMessage.react("🔴"))
            .then((reaction) => reaction.message.react("🔵"));
    },
};