const Discord = require('discord.js');

module.exports = {
    name: "test",
    aliases: ["t"],
    devOnly: true,
    async execute(message, args, data, client) {
        client.paginate(message, [new Discord.MessageEmbed().setTitle('oo 1').setDescription('yes'), new Discord.MessageEmbed().setTitle('oo 2').setDescription('no')]);
    },
};