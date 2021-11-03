const Discord = require('discord.js');

module.exports = {
    name: "8ball",
    aliases: ['ball', '8'],
    cooldown: 3,
    async execute(message, args, data, client) {
        const answers = [
            'Yes, definately!',
            'Definately! not..',
            'I guess so?',
            'Probably not.',
            'You never know',
            '¯\\_(ツ)_/¯',
            'I don\'t know.',
            'Maybe?',
            'No.',
            'Yes.',
            'I have doubts.',
            'I can\'t predict now.',
            'Try asking again.',
        ];

        const question = args.join(" ");
        if (question == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription('Please provide a question to ask').setColor('GREY')] });

        const embed = new Discord.MessageEmbed()
            .setTitle('The Magic 8-Ball')
            .addField('Question:', `\`\`\`${question}\`\`\``)
            .addField('Answer:', `\`\`\`${answers[Math.floor(Math.random() * answers.length)]}\`\`\``)
            .setFooter(`Question asked by ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor("RANDOM");
        message.channel.send({ embeds: [embed] });

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};