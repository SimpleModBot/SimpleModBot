const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class VersionCommand extends BaseCommand {
  constructor() {
    super('version', 'information', ['ver']);
  }

  async run(client, message, args) {
    const versionEmbed = new Discord.MessageEmbed()
      .setTitle("Current bot version:")
      .setDescription("V43")
      .setURL("https://github.com/DEATHB4DEFEAT/SimpleModBot-Updates")
      .addField("➕Added:\n✅bug fix\n** **\n➕Updated:\n✅\`hug\`")
      .setTimestamp();
    
    message.channel.send(versionEmbed);
  }
}