module.exports = {
    name: "chat",
    aliases: ["talk"],
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') return;
        
        async function chatBot(message, input) {
            if (!message) throw new ReferenceError('simplemodbot => "message" is not defined');
            if (!input) throw new ReferenceError('simplemodbot => "input" is not defined');

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