const Discord = require('discord.js');

module.exports = {
    name: "burger",
    execute(message, args, client) {
        const burgerEmbed = new Discord.MessageEmbed()
            .setTitle("hamburger🍔")
            .setDescription("Who ordered a hamburger? I got someones burger order.")
            .setColor("BROWN");
        
        message.channel.send(burgerEmbed);

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};