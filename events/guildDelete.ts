const Discord = require("discord.js");

module.exports = {
    name: 'guildDelete',
    async execute(guild, client) {
        {

            const joinNotifChannel = await client.channels.cache.get("834283366324895786");
            const notifEmbed = new Discord.MessageEmbed()
                .setTitle("I have left a guild.")
                .addField(`Name:`, `${guild.name}`, true)
                .addField(`ID:`, `${guild.id}`, true)
                .setTimestamp()
                .setColor("GREY");

            joinNotifChannel.send({ content: "Left Guild.", embeds: [notifEmbed] });
        }
    },
};