const Discord = require('discord.js');

module.exports = {
    name: "pin",
    description: "Pins a message with given id.",
    aliases: [],
    cooldown: 5,
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give a valid message id.`).setColor('GREY')], allowedMentions: { repliedUser: false } });

        try {
            const msg = await message.channel.messages.fetch(args[0])
            await msg.pin()
        } catch (e) {
            return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`An error occurred, you probably didn't give a valid message id.`).setColor('GREY')], allowedMentions: { repliedUser: false } })
        };

        message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Successfully pinned \`${args[0]}\`!`).setColor('GREY')], allowedMentions: { repliedUser: false } });
    },
};