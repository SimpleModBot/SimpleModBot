const figlet = require("figlet");
const rgb = require("lolcatjs");
const log4jsRun = require(`../utils/other/log4js`);
const Discord = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(client) {
        log4jsRun();

        const SMB = figlet.textSync("SimpleModBot", {
            font: 'broadway',
            horizontalLayout: 'fitted',
            verticalLayout: 'fitted',
            width: 500,
            whitespaceBreak: true
        });

        rgb.fromString(SMB);

        let serverIn = await client.guilds.cache.size;
        let serverMembers = await client.users.cache.size;

        const statuses = [
            `For //help`,
            `For //support`,
            `${serverIn} servers.`,
            `${serverMembers} members.`
        ];

        let index = 0;
        setInterval(() => {
            if (index === statuses.length) index = 0;
            const status = statuses[index];
            client.user.setPresence({
                activities: [{
                    name: `${status}`,
                    type: "WATCHING",
                }],
                status: "online",
            })
            index++;
        }, 20000);

        await client.channels.cache.get('883252233926488074').send({ embeds: [new Discord.MessageEmbed().setDescription(`\`${client.user.tag}\` is now online!`).setColor('GREY').setTimestamp()] });
    },
};