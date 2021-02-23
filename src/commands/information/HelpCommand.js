const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'information', []);
  }

  run(client, message, args) {
    const sectionEmbed = new Discord.MessageEmbed()
   .setTitle('Bot Help Sections')
   .setDescription('Use //help sectionName to access another section.\nSections:\ninformation\nfun\nmoderation')
   .addField('Fun Commands', 'Commands that all users can use that are for fun and have no purpose.')
   .addField('Information commands', 'Commands that return some information.')
   .addField('Moderation commands', 'Commands that are for moderation within a server.')
   .setFooter(client.user.tag, client.user.displayAvatarURL());
 
const infoEmbed = new Discord.MessageEmbed()  
   .setTitle('Information Commands.')
   .addField('Help Commands', 'This commands shows the user all the commands possable.')
   .addField('Social Command', 'Displays social media in an embed and bot invite.');
 
const funEmbed = new Discord.MessageEmbed()
   .setTitle('Fun Commands.')
   .addField('Avatar Command', 'Returns a users avatar.')
   .addField('Meme Commands', 'Returns a Meme to the channel.')
   .addField('Nickname Command', 'Changes a members nickname in a server')
   .addField('Say Command', 'Make the bot say a message to the channel.')
 
const moderationEmbed = new Discord.MessageEmbed()
   .setTitle('Moderation Commands.')
   .addField('Ban Command', 'Bans a member from the server')
   .addField('Kick Command', 'Kicks a member from the server')
   .addField('Mute Command', 'Mutes a member in the server \`wip\`')
   .addField('Nuke Command', 'Clones a channel and deletes the old one.')
   .addField('Purge Command', 'Purges messages within a channel')
   .addField('Unban Command', 'Unbans a member from the server')
   .addField('Unmute Command', 'Unmutes a member in a server \`wip\`');
 
if (!args[0]) return message.channel.send(sectionEmbed);
if (args[0] == 'information') return message.channel.send(infoEmbed);
else if (args[0] == 'fun') return message.channel.send(funEmbed);
else if (args[0] == 'moderation') return message.channel.send(moderationEmbed);
  }
}