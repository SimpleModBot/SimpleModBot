const weky = require('weky');

module.exports = {
    name: "flip",
    DMU: true,
    async execute(message, args, data, client) {
        if (!args[0]) return message.channel.send({ content: "You need to say something to randomize!" });
        const sentence = args.join(" ");
        let flippedSentence = weky.flip(sentence);
        message.channel.send({ content: flippedSentence });
    },
};