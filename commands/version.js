const Discord = require("discord.js");

module.exports = {
    name: 'version',
    description: 'Shows the current version and additions to the bot.',
    async execute(message, args, client) {

        const versionEmbed = new Discord.MessageEmbed()
            .setTitle("Current bot version:")
            .setDescription("V45")
            .setURL("https://github.com/DEATHB4DEFEAT/SimpleModBot-Updates")
            .addField("➕Added:\n✅Nothing\n** **\n➕Updated:\n✅//Servers")
            .setTimestamp();

        message.channel.send(versionEmbed);
    },
};