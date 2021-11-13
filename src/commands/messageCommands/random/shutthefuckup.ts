const Discord = require('discord.js');

module.exports = {
    name: "shutthefuckup",
    description: "Please shut the fuck up.",
    aliases: ['stfu'],
    cooldown: 10,
    async execute(message, args, data, client) {
        const attachment = new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/814386802609487912/908192822086205460/stfu.mov', 'stfu.mov');

        message.channel.send({ content: '*If you have this clip without a watermark please dm it to me `DEATHB4DEFEAT#1018`*', files: [attachment], allowedMentions: { repliedUser: false } });
    },
};