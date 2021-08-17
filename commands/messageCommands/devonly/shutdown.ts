module.exports = {
    name: "shutdown",
    aliases: ["sd"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        await message.channel.send({ content: "Goodbye! I hope I will see you next time I am online." });
        process.exit();
    },
};