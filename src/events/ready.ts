// @ts-ignore
const Discord = require('discord.js');
const figlet = require("figlet");
const rgb = require("lolcatjs");
const chalk  = require("chalk");
const { table } = require('table');

module.exports = {
    name: 'ready',
    async execute(client) {
        client.guilds.cache.forEach(async guild => {
            guild.commands.set(client.commandArray);
        });

        const data = [
            ["LOGGED IN AS", `${chalk.red.bold(client.user.tag)}`, "The client user tag."],
            ["GUILD COUNT", `${chalk.yellow.bold(await client.guilds.cache.size)}`, "The amount of guilds I'm in."],
            ["USER COUNT", `${chalk.green.bold(await client.users.cache.size)}`, "The amount of users in my guilds."],
            ["PREFIX", `${chalk.cyan.bold(client.prefix)}`, "The prefix to use my commands."],
            ["MCOMMANDS", `${chalk.blue.bold(client.messageCommands.size)}`, "Number of mCommands I have."],
            ["SCOMMANDS", `${chalk.blue.bold(client.slashCommands.size)}`, "Number of sCommands I have."],
        ];

        const config = {
            border: {
                topBody: `─`,
                topJoin: `┬`,
                topLeft: `┌`,
                topRight: `┐`,

                bottomBody: `─`,
                bottomJoin: `┴`,
                bottomLeft: `└`,
                bottomRight: `┘`,

                bodyLeft: `│`,
                bodyRight: `│`,
                bodyJoin: `│`,

                joinBody: `─`,
                joinLeft: `├`,
                joinRight: `┤`,
                joinJoin: `┼`
            },
            header: {
                alignment: 'center',
                content: "CLIENT DATA"
            }
        };

        console.log(table(data, config));

        let serverIn = await client.guilds.cache.size;
        let serverMembers = await client.users.cache.size;

        // COMPETING WATCHING PLAYING STREAMING LISTENING
        const statuses = [
            [`${serverIn} servers.`, `WATCHING`],
            [`${serverMembers} members.`, `WATCHING`],
            [`you..`, `WATCHING`],
            [`for commands.`, `LISTENING`],
            [`for mentions.`, `LISTENING`],
        ];

        setInterval(() => {
            const num = Math.floor(Math.random() * statuses.length);
            const message = statuses[num][0];
            const type = statuses[num][1];

            client.user.setPresence({
                activities: [{
                    name: message,
                    type: type,
                }],
                status: "online",
            });
        }, 20000);

        await client.channels.cache.get('915827579431288843').send({ embeds: [new Discord.MessageEmbed().setDescription(`\`${client.user.tag}\` is now online!`).setColor('GREY').setTimestamp()] });
    },
};