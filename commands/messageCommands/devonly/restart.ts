module.exports = {
    name: "restart",
    aliases: ["res"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        await message.channel.send({ content: "Restarting bot.." });
        setTimeout(async () => {
            await message.reply({ content: "I have successfully restarted!\n|| There is a 10 second delay to send this message to make sure the bot has actually been restarted so I don't lie. ^-^||" });
            process.exit();
        }, 10000);
    },
};