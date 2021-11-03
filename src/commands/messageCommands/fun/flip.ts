const weky = require('weky');
const Discord = require('discord.js');

module.exports = {
    name: "flip",
    DMU: true,
    async execute(message, args, data, client) {
        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to say something to randomize!").setColor('GREY')] });
        const sentence = args.join(" ");
        let flippedSentence = weky.flip(sentence);
        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(flippedSentence).setColor('GREY')] });
    },
};