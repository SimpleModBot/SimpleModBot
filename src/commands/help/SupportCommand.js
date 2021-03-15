const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class SupportCommand extends BaseCommand {
  constructor() {
    super("support", "help", []);
  }

  run(client, message, args) {
    message.channel.send(
      "To receive direct support join the support/community server: https://discord.gg/yfcvPmxkmR"
    );
    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      message.delete();
    }
  }
};
