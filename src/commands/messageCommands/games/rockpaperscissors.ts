const Discord = require('discord.js');

module.exports = {
    name: 'rockpaperscissors',
    aliases: ['rps'],
    description: 'Plays a game of rock paper scissors',
    async execute(message, args, data, client) {
        const botChoice = Math.floor(Math.random() * 2) + 1;
        let botEmoji;
        let playerEmoji;
        let botChoiceStr;

        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to say your choice. rock, paper, or scissors?").setColor('GREY')] });
        if (!["rock", "paper", "scissors"].includes(args[0])) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You did not choose one of the options: `rock`, `paper`, or `scissors`.").setColor('GREY')] });

        if (botChoice == 1) {
            botChoiceStr = "rock";
            botEmoji = ":rock: Rock";
        }
        if (botChoice == 2) {
            botChoiceStr = "paper";
            botEmoji = ":newspaper: Paper";
        }
        if (botChoice == 3) {
            botChoiceStr = "scissors";
            botEmoji = ":scissors: Scissors";
        }

        if (args[0] == "rock") playerEmoji = ":rock: Rock";
        if (args[0] == "paper") playerEmoji = ":newspaper: Paper";
        if (args[0] == "scissors") playerEmoji = ":scissors: Scissors";

        if (botChoiceStr == args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`${botEmoji} vs ${playerEmoji}! We tied! Try again..`).setColor('GREY')] });
        if (args[0] == "rock") {
            if (botChoiceStr == "paper") return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`${botEmoji} vs ${playerEmoji}! You lost.. Better luck next time!`).setColor('GREY')] });
            else return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`${botEmoji} vs ${playerEmoji}! You won! Good job!`).setColor('GREY')] });
        }
        if (args[0] == "paper") {
            if (botChoiceStr == "scissors") return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`${botEmoji} vs ${playerEmoji}! You lost.. Better luck next time!`).setColor('GREY')] });
            else return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`${botEmoji} vs ${playerEmoji}! You won! Good job!`).setColor('GREY')] });
        }
        if (args[0] == "scissors") {
            if (botChoiceStr == "rock") return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`${botEmoji} vs ${playerEmoji}! You lost.. Better luck next time!`).setColor('GREY')] });
            else return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`${botEmoji} vs ${playerEmoji}! You won! Good job!`).setColor('GREY')] });
        }
    },
};