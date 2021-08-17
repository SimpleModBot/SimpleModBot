module.exports = {
    name: 'website',
    aliases: ['web'],
    DMU: true,
    description: 'Sends a link to the official website.',
    async execute(message, args, data, client) {
        message.channel.send({ content: "https://sites.google.com/view/simplemodbot/main" });
    },
};