const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'fun', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("You cannot use this command.");
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I do not have the ability to MANAGE_NICKNAMES.");

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");

    if (!args[0]) return message.channel.send("You must mention a member to change their nickname.");
    if (!mentionedMember) return message.channel.send("The user mentioned is not in this server.");
    if (!nickName) return message.channel.send("You must say a nickname for this member.");
    if (!mentionedMember.kickable) return message.channel.send("I cannot change this users nickname because they are higher than my role");

    await mentionedMember.setNickname(nickName).catch(err => console.log(err).then(message.channel.send("I am unable to add this username due to an error.")));
    message.delete();
  }
}