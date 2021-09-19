const Discord = require('discord.js');

module.exports = {
    name: 'slowmode',
    aliases: ['slow'],
    description: 'Changes the slowmode for the selected channel(s).',
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You dont have permission to use this Command.").setColor('GREY')] });
        if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I need the permission `MANAGE_CHANNELS` to do this.").setColor('GREY')] });

        const value = Number(args[0]);

        if (!args[0]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to say a number for how many seconds you want the slowmode to be.").setColor('GREY')] });
        if (!value || value > 21600) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to say a number from 5-21600 in seconds.").setColor('GREY')] });
        try {
            await message.channel.setRateLimitPerUser(value);
            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`The channels slowmode has been set to ${value} seconds for ${message.channel}!`).setColor('GREY')] });
        } catch (err) {
            Promise.reject(new err);
        }

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};