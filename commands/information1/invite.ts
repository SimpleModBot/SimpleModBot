module.exports = {
    name: "invite",
    description: "Shows the bots invite",
    aliases: ["inv"],
    DMU: true,
    cooldown: 10,
    execute(message, args, data, client) {
        message.channel.send({ content: "https://top.gg/bot/808196506833125396" });
    },
};