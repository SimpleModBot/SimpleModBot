const Discord = require("discord.js");

module.exports = {
    name: 'version',
    aliases: ['ver'],
    description: 'Shows the current version and additions to the bot.',
    async execute(message, args, client) {

        const versionEmbed = new Discord.MessageEmbed()
            .setTitle("Current bot version:")
            .setDescription("V47")
            .setURL("https://github.com/DEATHB4DEFEAT/SimpleModBot-Updates")
            .addField("➕Added:\n✅Aliases back\n** **\n➕Updated:\n✅multiple commands")
            .setTimestamp();

        message.channel.send(versionEmbed);
    },
};