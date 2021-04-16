const Discord = require('discord.js');
const Levels = require('discord-xp');
const Blacklist = require('../database/models/blackListSchema');
const Afk = require('../database/models/afkSchema');

module.exports = {
    name: 'message',
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;

        const randomXP = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
        if (hasLeveledUP) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`${message.member.user.tag}, you have leveled up to ${user.level}!`)
                .then((lvlmsg) => {
                    lvlmsg.delete({ timeout: 3500 });
                });
        }

        if (await Afk.findOne({ userID: message.author.id })) {
            let afkProfile = await Afk.findOne({ userID: message.author.id });
            if (afkProfile.messagesLeft == 0) {
                await Afk.findOneAndDelete({ userID: message.author.id });
                message.channel.send(`You are no longer AFK ${message.author}!`);
            } else {
                await Afk.findOneAndUpdate({ userID: message.author.id }, { messagesLeft: afkProfile.messagesLeft - 1 });
            }
        }
        if (message.mentions.members.first()) {
            await message.mentions.members.forEach(async member => {
                let afkProfile = await Afk.findOne({ userID: member.user.id });
                if (afkProfile) message.channel.send(`That user is AFK because: ${afkProfile.reason}`)
                    .then((afkmsg) => {
                        afkmsg.delete({ timeout: 5000 });
                    });
            });
        }

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (message.content.includes(client.user.id)) return message.reply(`my prefix is: ${client.prefix}`);
        if (message.content.includes('geo') && message.guild.id == '753366889924657193') return message.channel.send('<@568307974964248587> is a nab.');
        if (!command) return;
        if (!message.content.startsWith(client.prefix)) return;

        const { cooldowns } = client;
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id) && message.author.id !== '750880076555354185') {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
                    .then((cooldownmsg) => {
                        cooldownmsg.delete({ timeout: 5000 });
                    });
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

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