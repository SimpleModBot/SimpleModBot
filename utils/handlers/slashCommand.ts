const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const figlet = require("figlet");
const rgb = require("lolcatjs");

module.exports = (client) => {
    client.handleSlashCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.ts'));
            for (const file of commandFiles) {
                const command = require(`../../commands/slashCommands/${folder}/${file}`);
                client.slashCommands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            };
        };

        const clientId = '822927576057774110';
        const guildId = '808201862862864408';
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                const slash = figlet.textSync("🔄SLASH🔄", {
                    font: 'broadway',
                    horizontalLayout: 'fitted',
                    verticalLayout: 'fitted',
                    width: 500,
                    whitespaceBreak: true
                });
                rgb.fromString(slash);

                // await rest.put(
                //     Routes.applicationGuildCommands(clientId, guildId),
                //     { body: client.commandArray },
                // );

                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: client.commandArray },
                );

                const hsals = figlet.textSync("💹SLASH💹", {
                    font: 'broadway',
                    horizontalLayout: 'fitted',
                    verticalLayout: 'fitted',
                    width: 500,
                    whitespaceBreak: true
                });
                rgb.fromString(hsals);
            } catch (error) {
                console.error(error);
            }
        })();
    };
};