const Levels = require('discord-xp');
const Discord = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ['leaders'],
    description: 'Shows the servers leaderboard.',
    async execute(message, args, client) {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        const leaderboardEmbed = new Discord.MessageEmbed()
            .setTitle("**Leaderboard**:")
            .setDescription(`${lb.join("\n\n")}`)
            .setColor("#000000")
            .setFooter(`${message.author.tag} is looking at the leaderboard.`);
        message.channel.send(leaderboardEmbed);
    },
};