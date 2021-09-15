const fs = require('fs');

module.exports = {
    name: 'addcmd',
    aliases: ['acmd'],
    devOnly: true,
    description: 'Reloads a command',
    async execute(message, args, data, client) {
        if (!args[0]) return message.channel.send({ content: "You need to tell me what command to reload, ex: //reload help" });

        const commandName = args[0].toLowerCase();
        const commandFolders = fs.readdirSync('./commands/messageCommands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/messageCommands/${folder}`).includes(`${commandName}.ts`));

        try {
            const newCommand = require(`../${folderName}/${commandName}.ts`);
            client.messageCommands.set(newCommand.name, newCommand);
            message.channel.send({ content: `Command \`${commandName}\` was added!` });
        } catch (error) {
            message.channel.send({ content: `There was an error while adding \`${commandName}\`:\n\`${error.message}\`` });
        }
    },
};