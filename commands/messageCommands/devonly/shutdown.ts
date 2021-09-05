const Discord = require('discord.js');

module.exports = {
    name: "shutdown",
    aliases: ["sd"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        await message.channel.send({ content: "Shutting down. Goodbye!" });
        await client.channels.cache.get('883252233926488074').send({ embeds: [new Discord.MessageEmbed().setDescription(`${message.author} is shutting down the bot.`).setColor('GREY').setTimestamp()] });
        process.exit();
    },
};