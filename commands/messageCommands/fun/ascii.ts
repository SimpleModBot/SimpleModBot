const figlet = require('figlet');

module.exports = {
    name: "ascii",
    DMU: true,
    async execute(message, args, data, client) {
        if (!args[0]) return message.channel.send({ content: 'Please provide some text' });
        const msg = args.join(" ");

        figlet.text(msg, function (err, data) {
            if (err) {
                Promise.reject(new err)
            }
            if (data.length > 2000) return message.channel.send({ content: 'Please provide text shorter than 2000 characters.' })

            message.channel.send('```' + data + '```')
        });
    },
};