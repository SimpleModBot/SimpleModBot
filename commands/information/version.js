const Discord = require("discord.js");

module.exports = {
    name: 'version',
    aliases: ['ver'],
    description: 'Shows the current version and additions to the bot.',
    async execute(message, args, client) {

        const versionEmbed = new Discord.MessageEmbed()
            .setTitle("Current bot version:")
            .setDescription("V49")
            .setURL("https://github.com/DEATHB4DEFEAT/SimpleModBot-Updates")
            .addField("Added:\n`duck`\n`this`\n** **\nUpdated:\n`help`\n`calculate`\n`leaderboard`")
            .setTimestamp();

        message.channel.send(versionEmbed);
    },
};