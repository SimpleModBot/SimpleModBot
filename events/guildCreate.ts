const Discord = require("discord.js");

module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {
        {
            const bots = await guild.members.cache.array().filter(b => b.user.bot).length;
            const humans = await guild.members.cache.size - bots;

            const joinNotifChannel = await client.channels.cache.get("834283366324895786");
            const notifEmbed = new Discord.MessageEmbed()
                .setTitle("I have joined a new guild!")
                .addField(`Owner:`, `${guild.owner.user.username}#${guild.owner.user.discriminator}`, true)
                .addField(`Name:`, `${guild.name}`, true)
                .addField(`ID:`, `${guild.id}`, true)
                .addField(`Humans:`, `${humans}`, true)
                .addField(`Bots:`, `${bots}`, true)
                .setTimestamp()
                .setColor("GREY");

            joinNotifChannel.send({ content: "New Guild.", embeds: [notifEmbed] });
        }
    },
};