const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'information', []);
  }

  async run(client, message, args) {
    const msg = await message.channel.send('Pinging...');

    const latency = msg.createdTimestamp - message.createdTimestamp;
    const choices = ['I hope the ping is okay! :)', 'Is the ping good?', 'Am I lagging or are you? I can\'t see :)']
    const response = choices[Math.floor(Math.random() * choices.length)];

    msg.edit(`${response}\n🤖Bot Latency: ${latency}ms`);

    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) { message.delete(); }
  }
}