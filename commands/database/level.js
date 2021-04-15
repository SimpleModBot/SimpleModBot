const levels = require('discord-xp');

module.exports = {
    name: 'level',
    cooldown: 3,
    description: 'Says users current level.',
    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;

        const user = await levels.fetch(target.id, message.guild.id);

        if (!user) return message.channel.send("This user has not earned any xp yet.");

        message.channel.send(`> **${target.tag}** is currently level ${user.level}.`);
    },
};