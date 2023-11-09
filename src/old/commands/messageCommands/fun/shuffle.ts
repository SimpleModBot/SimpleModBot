const Discord = require('discord.js');

module.exports = {
    name: "shuffle",
    description: "Shuffles the words in a sentence.",
    aliases: [],
    cooldown: 5,
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me a sentence to shuffle.`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        
        var array = args;
        var randholder = 0;
        var string = "";
        const lengt = array.length;

        for (let i = lengt; i > 0; i--) {
            randholder = Math.round(Math.random() * array.length);
            if (array[randholder] == null) randholder = randholder - 1;

            string = string + array[array.length == 1 ? 0 : randholder] + " ";
            array.splice(randholder, 1);
        };

        message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`${string}`).setColor('GREY')], allowedMentions: { repliedUser: false } });
    },
};