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
                client.scn = client.scn + 1;
                const command = require(`../../commands/slashCommands/${folder}/${file}`);
                client.slashCommands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            };
        };

        const clientId = '808196506833125396';
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: client.commandArray },
                );
            } catch (error) {
                console.log("\u200b");
            }
        })();
    };
};