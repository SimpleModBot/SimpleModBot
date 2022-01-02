const Discord = require('discord.js');

module.exports = {
    name: "embed",
    async execute(message, args, data, client) {
        if (args[0] == "ENA") return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setTitle('Invalid usage!')
                .setDescription(`__Embed tags:__
        \`-t\` Sets the title to whatever you put after it. Limit of 256 chars.
        \`-d\` Sets the description to whatever you put after it. Limit of 4096 chars.
        \`-f\` Sets the footer to whatever you put after it. Limit of 2048 chars.
        \`-c\` Sets the color to whatever you put after it.
        \`-m\` Sends the text as the actual message.

        Add a tag to your message and some text after it to change the embed!`).setColor('GREY')]
        });

        let embed = new Discord.MessageEmbed();
        let num = 0;
        let tf = false;

        if (message.content.includes('-t')) {
            if (message.content.split('-t')[1]) embed.setTitle(message.content.split('-t')[1].split('-')[0].slice(0, 256));
        }
        else num = num + 1;

        if (message.content.includes('-d')) {
            if (message.content.split('-d')[1]) embed.setDescription(message.content.split('-d')[1].split('-')[0].slice(0, 4096));
        } else {
            num = num + 1;
            embed.setDescription('\u200b');
        };

        if (message.content.includes('-f')) {
            if (message.content.split('-f')[1]) embed.setFooter({ text: message.content.split('-f')[1].split('-')[0].slice(0, 2048) });
        } else num = num + 1;

        if (message.content.includes('-c')) {
            if (message.content.split('-c')[1]) embed.setColor(message.content.split('-c')[1].split(' -')[0]);
        } else num = num + 1;

        if (message.content.includes('-m')) {
            if (message.content.split('-m')[1]) tf = true;
        };

        if (num < 4) {
            if (tf == false) {
                message.channel.send({ embeds: [embed] });
            } else if (tf == true) {
                message.channel.send({ content: message.content.split('-m')[1].split('-')[0].slice(0, 2000), embeds: [embed] });
            };
        } else return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setTitle('Invalid usage!')
                .setDescription(`__Embed tags:__
        \`-t\` Sets the title to whatever you put after it. Limit of 256 chars.
        \`-d\` Sets the description to whatever you put after it. Limit of 4096 chars.
        \`-f\` Sets the footer to whatever you put after it. Limit of 2048 chars.
        \`-c\` Sets the color to whatever you put after it.
        \`-m\` Sends the text as the actual message.

        Add a tag to your message and some text after it to change the embed!`).setColor('GREY')]
        });
    },
};