const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LogissueCommand extends BaseCommand {
  constructor() {
    super('logissue', 'help', ['log']);
  }

  run(client, message, args) {
    console.log(message.content);
    message.channel.send('I have sent a bug report into the console.');
  }
}