const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I do not have permission to MANAGE_ROLES.');

    let reason = args.slice(1).join(" ");

    const muteRole = message.guild.roles.cache.get('812106222223884308');
    const memberRole = message.guild.roles.cache.get('812108515840622624');
    const mentionedMember = message.mentionedMember || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been unmuted in ${message.guild.name}`)
      .setDescription(`Reason for being unmuted: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();

    if (!args[0]) return message.channel.send(`\`//unmute ID reason\``);
    if (!mentionedMember) return message.channel.send('The user mentioned is not in this server.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself, why would you want that?');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot mute me with my own command lol.');
    if (!reason) reason = 'No reason given.';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('This member is already unmuted.');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot unmute someone with a higher ranked role than yourself.');

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send('there was an error giving the user member role.')));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('there was an error removing the users muted role.')));

  }
}