const Discord = require("discord.js");

module.exports = {
    name: 'version',
    description: 'Shows the current version and additions to the bot.',
    async execute(message, args, client) {

        const versionEmbed = new Discord.MessageEmbed()
            .setTitle("Current bot version:")
            .setDescription("V43")
            .setURL("https://github.com/DEATHB4DEFEAT/SimpleModBot-Updates")
            .addField("➕Added:\n✅Every Old Command\n** **\n➕Updated:\n✅The Bot")
            .setTimestamp();

        message.channel.send(versionEmbed);
    },
};