const Discord = require('discord.js');

module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {
        {
            const joinNotifChannel = await client.channels.cache.get("834283366324895786");
            const notifEmbed = new Discord.MessageEmbed()
                .setTitle("I have joined a new guild!")
                .setDescription(`Guild Name: ${guild.name}`)
                .setTimestamp()
                .setColor("GREY");
            joinNotifChannel.send(notifEmbed);
        }
    
        {
            const joinMsgChannel = await guild.channels.cache.find(jmc => jmc.name.includes("general"));
            if (!joinMsgChannel) return;
            joinMsgChannel.send(`Thanks for inviting me to your server!
            \nTo view my commands, please type \`${client.prefix}help\` or \`${client.prefix}help sectionName\``);
        }
    },
};