const Discord = require("discord.js");

module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {
        {
            const joinNotifChannel = await client.channels.cache.get("834283366324895786");
            const notifEmbed = new Discord.MessageEmbed()
                .setTitle("I have joined a new guild!")
                .addField(`Name:`, `${guild.name}`, true)
                .addField(`ID:`, `${guild.id}`, true)
                .addField(`\u200b`, `\u200b`, true)
                .addField(`Owner:`, `${(await guild.fetchOwner()).user.tag}`, true)
                .addField(`OwnerID:`, `${(await guild.fetchOwner()).user.id}`, true)
                .addField(`\u200b`, `\u200b`, true)
                .setTimestamp()
                .setColor("GREY");

            joinNotifChannel.send({ content: "New Guild.", embeds: [notifEmbed] });
        }
    },
};