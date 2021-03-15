const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super("slowmode", "moderation", []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        "You dont have permission to use this Command."
      );
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        "I need the permission `MANAGE_CHANNELS` to do this."
      );

    const value = Number(args[0]);

    if (!args[0])
      return message.channel.send(
        "You need to say a number for how many seconds you want the slowmode to be."
      );
    if (!value || value < 5 || value > 21600)
      return message.channel.send(
        "You need to say a number from 5-21600 in seconds."
      );
    try {
      await message.channel.setRateLimitPerUser(value);
      message.channel.send(
        `The channels slowmode has been set to ${value} seconds for ${message.channel}!`
      );
    } catch (err) {
      console.log(err);
      message.channel.send(
        "Something went wrong doing this command. If you think this is a bug please use `//log` to report the issue with a description."
      );
    }
    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      message.delete();
    }
  }
};
