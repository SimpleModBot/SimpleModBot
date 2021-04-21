const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        {
            const welcomechannel = await member.guild.channels.cache.find(wc => wc.name.includes("welcome"));
            if (!welcomechannel) return;
            const welcomeEmbed = new Discord.MessageEmbed()
                .setTitle("A new user has joined!")
                .setDescription(`Everyone welcome ${member.user}!`)
                .setTimestamp()
                .setColor("GREY");
            welcomechannel.send(welcomeEmbed);
        }
    },
};