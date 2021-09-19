const schema = require('../../../database/models/ccSchema.ts');
const Discord = require('discord.js');

module.exports = {
    name: 'cc-delete',
    aliases: ['cc-remove'],
    cooldown: 10,
    async execute(message, args, a, client) {
        if (!message.member.permissions.has('MANAGE_MESSAGES') && message.author.id !== client.ownerID) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('You do not have permission to use this command.').setColor('GREY')] });

        const name = args[0];
        if (name == "ENA") return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('Please specify a command.').setColor('GREY')] });

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if (!data) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('That custom command does not exist!').setColor('GREY')] });
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });

        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Removed *\`${name}\`* from custom commands!`).setColor('GREY')] });
    },
};