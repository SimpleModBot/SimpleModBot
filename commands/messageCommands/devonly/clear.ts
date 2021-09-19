const figlet = require("figlet");
const rgb = require("lolcatjs");
const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clears console.',
    async execute(message, args, data, client) {
        await console.clear();

        const SMB = figlet.textSync("SimpleModBot", {
            font: 'broadway',
            horizontalLayout: 'fitted',
            verticalLayout: 'fitted',
            width: 500,
            whitespaceBreak: true
        });

        await rgb.fromString(`Loaded Events: ${client.en}\nLoaded messageCommands: ${client.mcn}\nLoaded slashCommands: ${client.scn}`);
        await rgb.fromString(SMB);

        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('I have cleared the console ^-^').setColor('GREY')] });
    },
};