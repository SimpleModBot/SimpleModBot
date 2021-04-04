

module.exports = {
    name: 'website',
    aliases: ['web'],
    description: 'Sends a link to the official website.',
    async execute(message, args, client) {

        message.channel.send("https://sites.google.com/view/simplemodbot/main");
    },
};