module.exports = {
    name: "chat",
    aliases: ["talk"],
    async execute(message, args, data, client) {
        async function chatBot(message, input) {
            if (!message)
                throw new ReferenceError('reconlx => "message" is not defined');
            if (!input) throw new ReferenceError('reconlx => "input" is not defined');
            const fetch = require("node-fetch");
            try {
                fetch(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(input)}&uid=${message.author.id}`)
                    .then((res) => res.json())
                    .then(async (json) => {
                        return message.reply({ content: json.response, allowedMentions: { everyone: false } });
                    });
            } catch (err) {
                Promise.reject(new err);
            };
        };
        chatBot(message, args.join(" "));
    },
};