const { Message, Client, MessageAttachment } = require("discord.js");

module.exports = {
    name: "oogway",
    description: "He never lies.",
    async execute(message, args, data, client) {
        let text = args.slice(0).join(" ");
        if (text == "ENA") return message.reply({ content: 'Give me some text to put on the image!' });

        let final = "https://luminabot.xyz/api/image/oogway?text=" + encodeURIComponent(text)
        const att = new MessageAttachment(final, 'oogway.png', null)

        message.channel.send({
            files: [att]
        });
    },
};