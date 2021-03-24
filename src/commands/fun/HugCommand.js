const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HugCommand extends BaseCommand {
  constructor() {
    super('hug', 'fun', []);
  }

  async run(client, message, args) {
    const mentionedMember = message.mentions.members.first();

    if (!args[0]) return message.channel.send("Heres a hug! *hug* :)");
    if (!mentionedMember) return message.channel.send("You have found the secret hug! :o\n** **\n*gives mega hug to you* :D");

    const hugUEmbed = new Discord.MessageEmbed()
      .setTitle("Someone has been hugged!")
      .setDescription(`${message.author} sent a hug to ${mentionedMember.user}!\n*Hugs ${mentionedMember.user}* :)`)
      .setColor("#7289da");
    
    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) { message.delete(); }
    if (mentionedMember) return message.channel.send(hugUEmbed);
  }
}