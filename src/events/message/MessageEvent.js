const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(client.prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
  async run(client) {
    let serverIn = await client.guilds.cache.size;
    console.log(client.user.tag + ' has logged in.');
    client.user.setPresence({
      activity: {
        name: `${serverIn} servers. Prefix: //`,
        type: "WATCHING"
      }, status: 'online'
    })}
}