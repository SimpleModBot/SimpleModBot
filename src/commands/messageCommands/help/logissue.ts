const Discord = require('discord.js');

module.exports = {
    name: 'logissue',
    aliases: ['log'],
    description: 'Sends a message to the console.',
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription("You need to give me a message to send.").setColor('GREY')], allowedMentions: { repliedUser: false } });
        const channel = client.channels.cache.get('915843295467421757');
        channel.send({ embeds: [new Discord.MessageEmbed().setDescription(args.join(' ')).setFooter(`${message.author.tag} - ${message.author.id}`, message.author.displayAvatarURL()).setColor('GREY')] });
        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("I have succesfully sent your message to the logs. Please do not spam or you will be blacklisted.").setColor('GREY')] });
    },
};