module.exports = {
    name: 'ping',
    description: 'Shows the bot/users ping.',
    async execute(message, args, client) {
        const msg = await message.channel.send('Pinging...');

        const latency = msg.createdTimestamp - message.createdTimestamp;
        const choices = ['I hope the ping is okay! :)', 'Is the ping good?', 'Am I lagging or are you? I can\'t see :)']
        const response = choices[Math.floor(Math.random() * choices.length)];

        msg.edit(`${response}\n🤖Bot Latency: ${latency}ms`);
    },
};