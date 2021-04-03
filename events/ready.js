const Discord = require('discord.js');
const timestamp = require('console-timestamp');
const now = new Date();
const number = 478921;

module.exports = {
    name: 'ready',
    async execute(client) {

        let serverIn = await client.guilds.cache.size;
        let serverMembers = await client.users.cache.size;

        console.log('[hh:mm:ss] '.timestamp + 'Starting Bot..');
        console.log('[hh:mm:ss] '.timestamp + `Watching ${serverIn} Servers!`);
        console.log('[hh:mm:ss] '.timestamp + `Watching ${serverMembers} Members!`);
        console.log('[hh:mm:ss] '.timestamp + 'Done Loading Successfully!');
        console.log('[hh:mm:ss] '.timestamp + client.user.tag + " has logged in.");


        const statuses = [
            `for if anyone wants a //hug`,
            `For //help`,
            `For //support`,
            `${serverIn} servers.`
        ];

        let index = 0;

        setInterval(() => {
            if (index === statuses.length) index = 0;
            const status = statuses[index];

            client.user.setPresence({activity: {
                        name: `${status}`,
                        type: "WATCHING",},status: "online",
            }).catch(console.error);
            index++;
            }, 15000);

        client.user
            .setUsername("SimpleModBot")
            .catch(console.error);
    },
};