const { tictactoe } = require('reconlx');

module.exports = {
    name: "tictactoe",
    aliases: ["ttt"],
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.reply({ content: `Please mention a user to play with!` })

        new tictactoe({
            player_two: user,
            message: message
        })
    },
};