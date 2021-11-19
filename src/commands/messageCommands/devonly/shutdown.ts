const Discord = require('discord.js');

module.exports = {
    name: "shutdown",
    aliases: ["shut"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        console.clear();
        await message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Restarting bot..").setColor('GREY')] });
        process.exit();
    },
};