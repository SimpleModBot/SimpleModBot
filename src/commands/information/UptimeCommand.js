const BaseCommand = require('../../utils/structures/BaseCommand');
const ms = require('ms');

module.exports = class UptimeCommand extends BaseCommand {
  constructor() {
    super('uptime', 'information', ['up']);
  }

  async run(client, message, args) {
    message.channel.send(`This bots uptime is \`${ms(client.uptime, { long: true })}\``);
  }
}