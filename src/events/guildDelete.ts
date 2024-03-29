const Discord = require("discord.js");

module.exports = {
    name: 'guildDelete',
    async execute(guild, client) {
        {
            const joinNotifChannel = await client.channels.cache.get("915826985744363570");
            const notifEmbed = new Discord.MessageEmbed()
                .setTitle("I have left a guild.")
                .addField(`Name:`, `${guild.name}`, true)
                .addField(`ID:`, `${guild.id}`, true)
                .addField(`\u200b`, `\u200b`, true)
                .addField(`Owner:`, `${(await guild.fetchOwner()).user.tag}`, true)
                .addField(`OwnerID:`, `${(await guild.fetchOwner()).user.id}`, true)
                .addField(`\u200b`, `\u200b`, true)
                .setTimestamp()
                .setColor("GREY");

            joinNotifChannel.send({ content: "Left Guild.", embeds: [notifEmbed] });
        }
    },
};