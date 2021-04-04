const ms = require('ms');

module.exports = {
    name: 'uptime',
    aliases: ['up'],
    description: 'Shows how long the bot has been active for.',
    async execute(message, args, client) {
        message.channel.send(`This bots uptime is \`${ms(client.uptime, { long: true })}\``);
    },
};