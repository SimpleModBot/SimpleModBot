module.exports = {
    name: "test",
    aliases: ["t"],
    devOnly: true,
    async execute(message, args, data, client) {
        message.reply({ content: "oooo", allowedMentions: { repliedUser: false }});
    },
};