const Discord = require('discord.js');

module.exports = {
    name: "activity",
    description: "Play games in a voice call!",
    aliases: [],
    cooldown: 5,
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me a channel id!`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        const channel = client.channels.cache.get(args[0]);

        if (channel.type !== 'GUILD_VOICE') {
            return message.reply("The chosen channel must be a voice channel ").catch(console.error);
        };

        if (!args[1]) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me an activity name!\nAvailable activities are:\n\`\`\`\nyoutube\npoker\nfishington\nbetrayal\nchess\n\`\`\``).setColor('GREY')], allowedMentions: { repliedUser: false } });

        if (args[1] === 'youtube') {
            client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
                return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join YouTube Together**](${invite.code} "Join YouTube Together")`).setColor('GREY')] });
            });

        } else if (args[1] === 'poker') {
            client.discordTogether.createTogetherCode(channel.id, 'poker').then(async invite => {
                return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join Poker Night**](${invite.code} "Join Poker Night")`).setColor('GREY')] });
            });

        } else if (args[1] === 'fishington') {
            client.discordTogether.createTogetherCode(channel.id, 'fishing').then(async invite => {
                return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join Fishington.io**](${invite.code} "Join fishington.io")`).setColor('GREY')] });
            });

        } else if (args[1] === 'betrayal') {
            client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(async invite => {
                return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join Betrayal.io**](${invite.code} "Join betrayal.io")`).setColor('GREY')] });
            });

        } else if (args[1] === 'chess') {
            client.discordTogether.createTogetherCode(channel.id, 'chess').then(async invite => {
                return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join Chess**](${invite.code} "Join A game of Chess")`).setColor('GREY')] });
            });
        };
    },
};