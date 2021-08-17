module.exports = {
    name: "emit",
    devOnly: true,
    async execute(message, args, data, client) {
        client.emit('guildDelete', message.guild, client);
    },
};