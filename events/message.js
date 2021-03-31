const Levels = require('discord-xp');
const Blacklist = require('../database/models/blackListSchema');

module.exports = {
    name: 'message',
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;

        const randomXP = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
        if (hasLeveledUP) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`${message.member}, you have leveled up to ${user.level}!`);
        }

        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);
        if (command.devOnly == true && message.author.id !== '750880076555354185') return message.channel.send('You don\'t have permission to use this command as it is only for developers.');

        let profile = await Blacklist.findOne({
            userID: message.author.id
        });
        if (profile) return message.channel.send('You cannot use this bot as you are banned. You can appeal in the support server: https://discord.gg/26NtPVvNCU');

        try {
            command.execute(message, args, client);
        } catch (err) {
            console.log(err);
        }
    },
};