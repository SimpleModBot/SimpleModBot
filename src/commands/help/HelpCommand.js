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
         .addField('Fun Commands', 'Commands that all users can use that are for fun and have no true purpose.')
         .addField('Help Commands', 'Commands That are used for help with this bot.')
         .addField('Information commands', 'Commands that return some information.')
         .addField('Moderation commands', 'Commands that are for moderation within a server.')
         .setFooter(client.user.tag, client.user.displayAvatarURL());

      const infoEmbed = new Discord.MessageEmbed()
         .setTitle('Information Commands.')
         .addField('\`Servers\` Commands', 'Shows a more accurate and nicer counter of the bots server count.')
         .addField('\`Social\` Command', 'Displays social media in an embed and bot invite.')
         .addField('\`Suggest\` Commands', 'Displays your message as a suggestion for whatever server your in.')
         .addField('\`Vote\` Command', 'Creates a poll in the current channel for people to vote on something.');

      const funEmbed = new Discord.MessageEmbed()
         .setTitle('\`Fun\` Commands.')
         .addField('\`Avatar\` Command', 'Returns a users avatar.')
         .addField('\`Meme\` Commands', 'Returns a Meme to the channel.')
         .addField('\`Nickname\` Command', 'Changes a members nickname in a server')
         .addField('\`Say\` Command', 'Make the bot say a message to the channel.');

      const moderationEmbed = new Discord.MessageEmbed()
         .setTitle('Moderation Commands.')
         .addField('\`Ban\` Command', 'Bans a member from the server')
         .addField('\`Kick\` Command', 'Kicks a member from the server')
         .addField('\`Mute\` Command', 'Mutes a member in the server \`wip\`')
         .addField('\`Nuke\` Command', 'Clones a channel and deletes the old one.')
         .addField('\`Purge\` Command', 'Purges messages within a channel')
         .addField('\`Unban\` Command', 'Unbans a member from the server')
         .addField('\`Unmute\` Command', 'Unmutes a member in a server \`wip\`');

      const helpEmbed = new Discord.MessageEmbed()
         .setTitle('Help Commands.')
         .addField('\`help\` Command`', 'Gives you the list of commands you can use')
         .addField('\`LogIssue\` or \`Log\`', 'Sends your message into the log so you can report issues that I dont see in testing.')
         .addField('\`Support\` Command', 'Sends a link to the server where you can get support');

      if (!args[0]) return message.channel.send(sectionEmbed);
      if (args[0] == 'information') return message.channel.send(infoEmbed);
      else if (args[0] == 'fun') return message.channel.send(funEmbed);
      else if (args[0] == 'moderation') return message.channel.send(moderationEmbed);
      else if (args[0] == 'help') return message.channel.send(helpEmbed);
   }
}