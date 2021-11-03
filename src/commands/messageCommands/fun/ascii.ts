const figlet = require('figlet');
const Discord = require('discord.js');

module.exports = {
    name: "ascii",
    DMU: true,
    async execute(message, args, data, client) {
        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('Please provide some text').setColor('GREY')] });
        const msg = args.join(" ");

        figlet.text(msg, function (err, data) {
            if (err) {
                Promise.reject(new err)
            }
            if (data.length > 2000) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('Please provide text shorter than 2000 characters.').setColor('GREY')] })

            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('```' + data + '```').setColor('GREY')] })
        });
    },
};