const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super("ban", "moderation", []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "You do not have permission to use this command!"
      );
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send("My role does not have permission to ban.");

    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    if (!reason) reason = "No reason given.";
    if (!args[0])
      return message.channel.send("You must mention a user to ban.");
    if (!mentionedMember)
      return message.channel.send("The mentioned user is not in this server.");
    if (!mentionedMember.bannable)
      return message.channel.send("I cannot ban this user.");

    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}`)
      .setDescription(`Reason for being banned: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();
    await mentionedMember.send(banEmbed).catch((err) => console.log(err));
    await mentionedMember
      .ban({
        days: 7,
        reason: reason,
      })
      .catch((err) => console.log(err))
      .then(() =>
        message.channel.send("Succesfully banned " + mentionedMember.user.tag)
      );
    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      message.delete();
    }
  }
};
