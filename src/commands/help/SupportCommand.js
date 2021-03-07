const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SupportCommand extends BaseCommand {
  constructor() {
    super('support', 'help', []);
  }

  run(client, message, args) {
    message.channel.send('To receive direct support join the support/community server: temporarily removed.');
    message.delete();
  }
}