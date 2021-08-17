const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        {
            const welcomechannel = await member.guild.channels.cache.find(wc => wc.name.includes("welcome"));
            if (!welcomechannel) return;

            const welcomeEmbed = new Discord.MessageEmbed()
                .setTitle("A new user has joined!")
                .setDescription(`Everyone welcome ${member.user.tag}!`)
                .setTimestamp()
                .setColor("GREY");

            if (welcomechannel.permissionsFor(member.guild.me).has(['SEND_MESSAGES'])) welcomechannel.send({ content: "Welcome!", embeds: [welcomeEmbed] });
        }
    },
};