const fs = require("fs");

module.exports = (client) => {
    client.handleMessageCommands = async (commandFolders, path) => {
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.ts'));
            for (const file of commandFiles) {
                const command = require(`../../commands/messageCommands/${folder}/${file}`);
                client.messageCommands.set(command.name, command);
            };
        };
    };
};