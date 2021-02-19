const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RecruitCommand extends BaseCommand {
  constructor() {
    super('recruit', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission to use this command.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to \`MANAGE_ROLES\`.");

    const pingRole = message.guild.roles.cache.get('812099045145313330');
    const staffRole = message.guild.roles.cache.get('812099063993991198');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!pingRole) return message.channel.send("There is no ping role to give.");
    if (!staffRole) return message.channel.send('There is no staff role to give.');
    if (!args[0]) return message.channel.send("\`//recruit @member\` or \`//recruit ID\`");
    if (!mentionedMember) return message.channel.send("The member or ID mentioned is not in the server.");

    await mentionedMember.roles.add(pingRole.id).catch(err => message.channel.send("I was unable to give the ping role due to an error."));
    await mentionedMember.roles.add(staffRole.id).catch(err => message.channel.send("I was unable to give the staff role due to an error."));
  }
}