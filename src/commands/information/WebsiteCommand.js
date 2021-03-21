const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class WebsiteCommand extends BaseCommand {
  constructor() {
    super("website", "information", ["web"]);
  }

  run(client, message, args) {
    message.channel.send("https://sites.google.com/view/simplemodbot/main");
  }
};
