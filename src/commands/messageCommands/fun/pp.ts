const Discord = require('discord.js');
const pp = [
    '8D',
    '8=D',
    '8==D',
    '8===D',
    '8====D',
    '8=====D',
    '8======D',
    '8=======D',
    '8========D',
    '8=========D',
    '8==========D',
    '8===========D',
    '8============D',
    '8=============D',
    '8==============D',
    '8===============D',
    '8================D',
    '8=================D',
    '8==================D',
    '8===================D',
    '8====================D',
    '8=====================D',
    '8======================D',
    '8=======================D',
    '8========================D',
    '8=========================D',
    '8==========================D',
    '8===========================D',
    '8============================D',
    '8=============================D',
    '8==============================D',
    '8===============================D',
    '8================================D',
    '8=================================D',
];

module.exports = {
    name: 'pp',
    aliases: ['ppsize'],
    async execute(message, args, data, client) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!member) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Please mentioned a user in this guild.`).setColor('GREY')] });
        let p = pp[Math.floor(Math.random() * pp.length)];
        if (member.user.id == client.ownerID) p = pp[Math.floor(Math.random() * (pp.length - 10)) + 10];

        const embed = new Discord.MessageEmbed()
            .setTitle('PP Size Detector')
            .setDescription(`${member.displayName}'s PP is this size: \n\`\`\`${p}\`\`\``)
            .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setColor(member.displayHexColor);

        await message.channel.send({ embeds: [embed] });
    },
};