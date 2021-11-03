const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'addcmd',
    aliases: ['acmd'],
    devOnly: true,
    description: 'Reloads a command',
    async execute(message, args, data, client) {
        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`You need to tell me what command to add, ex: ${client.prefix}addcmd cheese`).setColor('GREY')] });

        const commandName = args[0].toLowerCase();
        const commandFolders = fs.readdirSync('./commands/messageCommands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/messageCommands/${folder}`).includes(`${commandName}.ts`));

        try {
            const newCommand = require(`../${folderName}/${commandName}.ts`);
            client.messageCommands.set(newCommand.name, newCommand);
            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Command \`${commandName}\` was added!`).setColor('GREY')] });
        } catch (error) {
            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`There was an error while adding \`${commandName}\`:\n\`\`\`${error.message}\n\`\`\``).setColor('GREY')] });
        }
    },
};