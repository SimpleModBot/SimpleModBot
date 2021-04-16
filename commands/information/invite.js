module.exports = {
    name: "invite",
    cooldown: 10,
    aliases: ["inv"],
    description: "Shows the bots invite",
    execute(message, args, client) {
        message.channel.send("https://top.gg/bot/808196506833125396");
    },
};