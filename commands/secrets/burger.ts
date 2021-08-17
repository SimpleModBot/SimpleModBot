const Discord = require('discord.js');

module.exports = {
    name: "burger",
    DMU: true,
    execute(message, args, data, client) {
        const burgerEmbed = new Discord.MessageEmbed()
            .setTitle("🍔Hamburger🍔")
            .setDescription("Who ordered a hamburger? I got someones burger order.")
            .setColor("BROWN");

        message.channel.send({ embeds: [burgerEmbed] });

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};