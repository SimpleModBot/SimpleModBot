const fs = require('fs');

module.exports = {
    name: 'reload',
    aliases: ['re'],
    DMU: true,
    devOnly: true,
    description: 'Reloads a command',
    async execute(message, args, data, client) {
        if (!args[0]) {
            return message.channel.send({ content: "You need to tell me what command to reload, ex: //reload help" });
        }

        const commandName = args[0].toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send({ content: `There is currently no cached command with name or alias \`${commandName}\`` });
        }

        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.ts`));

        delete require.cache[require.resolve(`../${folderName}/${command.name}.ts`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.ts`);
            client.commands.set(newCommand.name, newCommand);
            message.channel.send({ content: `Command \`${command.name}\` was reloaded!` });
        } catch (error) {
            console.log(error);
            message.channel.send({ content: `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\`` });
        }
    },
};