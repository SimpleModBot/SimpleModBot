const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'reload',
    aliases: ['re'],
    devOnly: true,
    description: 'Reloads a command',
    async execute(message, args, data, client) {
        if (!args[0]) {
            return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to tell me what command to reload, ex: //reload help").setColor('GREY')] });
        }

        const commandName = args[0].toLowerCase();
        const command = client.messageCommands.get(commandName) || client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`There is currently no cached command with name or alias \`${commandName}\``).setColor('GREY')] });
        }

        const commandFolders = fs.readdirSync('./commands/messageCommands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/messageCommands/${folder}`).includes(`${command.name}.ts`));

        delete require.cache[require.resolve(`../${folderName}/${command.name}.ts`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.ts`);
            client.messageCommands.set(newCommand.name, newCommand);
            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Command \`${command.name}\` was reloaded!`).setColor('GREY')] });
        } catch (error) {
            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`There was an error while reloading \`${command.name}\`:\n\`\`\`${error.message}\n\`\`\``).setColor('GREY')] });
        }
    },
};