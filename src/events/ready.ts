const figlet = require("figlet");
const rgb = require("lolcatjs");
const log4jsRun = require(`../utils/other/log4js`);
const Discord = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(client) {
        log4jsRun();
        
        const SMB = figlet.textSync("SimpleModBot", {
            font: 'Broadway',
            horizontalLayout: 'fitted',
            verticalLayout: 'fitted',
            width: 500,
            whitespaceBreak: true
        });

        rgb.fromString(SMB);

        let serverIn = await client.guilds.cache.size;
        let serverMembers = await client.users.cache.size;

        const statuses = [
            `${serverIn} servers.`,
            `for commands.`,
            `${serverMembers} members.`,
            `for mentions.`,
            `you..`,
            `messages.`,
        ];

        setInterval(() => {
            client.user.setPresence({
                activities: [{
                    name: statuses[Math.floor(Math.random() * statuses.length)],
                    type: "WATCHING",
                }],
                status: "online",
            });
        }, 20000);

        await client.channels.cache.get('915827579431288843').send({ embeds: [new Discord.MessageEmbed().setDescription(`\`${client.user.tag}\` is now online!`).setColor('GREY').setTimestamp()] });
    },
};