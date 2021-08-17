const figlet = require("figlet");
const rgb = require("lolcatjs");
const log4jsRun = require(`../utils/other/log4js`);

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
                activity: {
                    name: `${status}`,
                    type: "WATCHING",
                }, status: "online",
            })
            index++;
        }, 20000);

        setInterval(async() => {
            const channel = await client.channels.cache.get("856795412600717322");
            if (client.hourlyCommands > 0) await channel.send(`This hour ${client.hourlyCommands} commands were used!`);
            client.hourlyCommands = 0;
        }, 3600000);
    },
};