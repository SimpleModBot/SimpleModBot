const num = {
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
};

module.exports = {
    name: "emojify",
    async execute(message, args, data, client) {
        if (!args[0]) return message.reply({ content: `Provide some text to turn into emojis!` })
        let msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
        if (message.content.length > 100) return message.channel.send({ content: "Please emojify something under 100 characters." });

        msg = msg.split('').map(c => {
            if (c === ' ') return c;
            else if (/[0-9]/.test(c)) return num[c];
            else return (/[a-zA-Z]/.test(c)) ? ':regional_indicator_' + c.toLowerCase() + ':' : '';
        }).join('');

        if (!msg) return message.reply({ content: `Cannot emojify **${args[0]}**` })

        if (msg.length > 2048) {
            msg = msg.slice(0, msg.length - (msg.length - 2033));
            msg = msg.slice(0, msg.lastIndexOf(':')) + '**bruh**';
        }

        message.channel.send({ content: msg });
    },
};