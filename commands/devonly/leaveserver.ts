const Discord = require('discord.js');
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
    name: "leaveserver",
    aliases: ["leaveguild", "ls"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        const guildId = args[0] || message.guild;
        if (!rgx.test(guildId)) return;

        const guild = message.client.guilds.cache.get(guildId);

        if (!guild) return message.channel.send({ content: "Please give me a valid guild ID." });
        await guild.leave();

        await message.channel.send({ content: `Left the guild **\`${guild.name}\`** with **\`${guild.memberCount}\`** Users Successfully!` });
    },
};