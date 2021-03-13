const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LogissueCommand extends BaseCommand {
  constructor() {
    super('logissue', 'help', ['log']);
  }

  async run(client, message, args) {
    console.log(message.content)
    message.channel.send('I have sent a bug report into the console. Please do not flood the console or I will leave this guild.');
    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) { message.delete() };
  }
}