const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class VersionCommand extends BaseCommand {
  constructor() {
    super('version', 'information', ['ver']);
  }

  async run(client, message, args) {
    const versionEmbed = new Discord.MessageEmbed()
      .setTitle("Current bot version:")
      .setDescription("V41")
      .setURL("https://github.com/DEATHB4DEFEAT/SimpleModBot-Updates")
      .addField("➕Added:\n✅\`version\` or \`ver\`\n✅\`hug\` or \`hug @user\`\n✅\`ping\`\n✅\`uptime\` or \`up\`\n** **\n➕Updated:\n✅\`help\`")
      .setTimestamp();
    
    message.channel.send(versionEmbed);
  }
}