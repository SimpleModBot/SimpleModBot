const Discord = require("discord.js");

module.exports = {
    name: 'version',
    aliases: ['ver'],
    description: 'Shows the current version and additions to the bot.',
    async execute(message, args, client) {

        const versionEmbed = new Discord.MessageEmbed()
            .setTitle("Current bot version:")
            .setDescription("V48")
            .setURL("https://github.com/DEATHB4DEFEAT/SimpleModBot-Updates")
            .addField("➕Added:\n✅`//afk (reason)`\n** **\n➕Updated:\n✅`//help`")
            .setTimestamp();

        message.channel.send(versionEmbed);
    },
};