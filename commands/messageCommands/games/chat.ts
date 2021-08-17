const { chatBot } = require("reconlx");

module.exports = {
    name: "chat",
    aliases: ["talk"],
    async execute(message, args, data, client) {
        try {
            chatBot(message, args.join(" "));
        } catch (err) {
            Promise.reject(new err)
        };
    },
};