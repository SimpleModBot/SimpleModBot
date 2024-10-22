// @ts-ignore
const fs = require('fs');
// @ts-ignore
const Discord = require('discord.js');
// @ts-ignore
const glob = require('glob');

module.exports = {
    name: 'reload',
    aliases: ['re'],
    devOnly: true,
    description: 'Reloads a command',
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') {
            return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to tell me what command to reload, ex: \\\\reload help").setColor('GREY')] });
        };

        if (args[0].toLowerCase() == 'all') {
            // Message commands
            glob(`${__dirname}/../**/*.ts`, async (err, fp) => {
                if (err) Promise.reject(new err);

                client.messageCommands.sweep(() => true);
                fp.forEach(f => {
                    delete require.cache[require.resolve(f)];
                    const pull = require(f);

                    if (pull.name) {
                        client.messageCommands.set(pull.name, pull);
                    }
                });
            });

            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('Successfully reloaded all commands!').setColor('GREY')] });
        } else {
            const commandName = args[0].toLowerCase();
            const command = client.messageCommands.get(commandName) || client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) {
                return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`There is currently no cached command with name or alias \`${commandName}\``).setColor('GREY')] });
            };

            const commandFolders = fs.readdirSync('./commands/messageCommands');
            const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/messageCommands/${folder}`).includes(`${command.name}.ts`));

            delete require.cache[require.resolve(`../${folderName}/${command.name}.ts`)];

            try {
                const newCommand = require(`../${folderName}/${command.name}.ts`);
                client.messageCommands.set(newCommand.name, newCommand);
                message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Command \`${command.name}\` was reloaded!`).setColor('GREY')] });
            } catch (error) {
                message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`There was an error while reloading \`${command.name}\`:\n\`\`\`${error.message}\n\`\`\``).setColor('GREY')] });
            };
        };
    },
};
