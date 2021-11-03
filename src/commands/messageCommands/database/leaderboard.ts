const Levels = require('discord-xp');
const Discord = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ['leaders'],
    cooldown: 3,
    description: 'Shows the servers leaderboard.',
    async execute(message, args, data, client) {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
        if (rawLeaderboard.length < 1) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("Nobody's in leaderboard yet.").setColor('GREY')] });
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        const leaderboardEmbed = new Discord.MessageEmbed()
            .setTitle("**Leaderboard**:")
            .setDescription(`${lb.join("\n\n")}`)
            .setFooter(`${message.author.tag} is looking at the leaderboard.`)
            .setColor("GREY");

        message.channel.send({ embeds: [leaderboardEmbed] });
    },
};