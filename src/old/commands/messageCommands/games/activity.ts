const Discord = require('discord.js');

module.exports = {
    name: "activity",
    description: "Play games in a voice call!",
    aliases: [],
    cooldown: 5,
    async execute(message, args, data, client) {

        const activities = {
            youtube: '880218394199220334', // Note : First package to include the new YouTube Together version, any other package offering it will be clearly inspired by it
            youtubedev: '880218832743055411', // Note : First package to include the new YouTube Together development version, any other package offering it will be clearly inspired by it
            poker: '755827207812677713',
            betrayal: '773336526917861400',
            fishing: '814288819477020702',
            chess: '832012774040141894',
            chessdev: '832012586023256104',
            lettertile: '879863686565621790',
            wordsnack: '879863976006127627',
            doodlecrew: '878067389634314250',
            awkword: '879863881349087252',
            spellcast: '852509694341283871',
            checkers: '832013003968348200',
            puttparty: '763133495793942528',
        };

        let active = [];
        for (const activity in activities) {
            active.push(activity);
        };

        if (!message.member.voice.channel) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`You need to be in a voice channel!`).setColor('GREY')] });
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me an activity name!\nAvailable activities are:\n\`\`\`\n${active.join('\n')}\n\`\`\``).setColor('GREY')], allowedMentions: { repliedUser: false } });

        for (const activity in activities) {
            if (activity == args[0]) {
                const activityName = activity.charAt(0).toUpperCase() + activity.slice(1);
                const activityID = activities[activity];

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, activityName).then(async invite => {
                    return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join ${activityName}**](${invite.code} "Join ${activityName}")`).setColor('GREY')] });
                });
            }
        };

        // if (args[1] === 'youtube') {
        //     client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
        //         return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join YouTube Together**](${invite.code} "Join YouTube Together")`).setColor('GREY')] });
        //     });

        // } else if (args[1] === 'poker') {
        //     client.discordTogether.createTogetherCode(channel.id, 'poker').then(async invite => {
        //         return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join Poker Night**](${invite.code} "Join Poker Night")`).setColor('GREY')] });
        //     });

        // } else if (args[1] === 'fishington') {
        //     client.discordTogether.createTogetherCode(channel.id, 'fishing').then(async invite => {
        //         return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join Fishington.io**](${invite.code} "Join fishington.io")`).setColor('GREY')] });
        //     });

        // } else if (args[1] === 'betrayal') {
        //     client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(async invite => {
        //         return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join Betrayal.io**](${invite.code} "Join betrayal.io")`).setColor('GREY')] });
        //     });

        // } else if (args[1] === 'chess') {
        //     client.discordTogether.createTogetherCode(channel.id, 'chess').then(async invite => {
        //         return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`[**Click here to join Chess**](${invite.code} "Join A game of Chess")`).setColor('GREY')] });
        //     });
        // };
    },
};