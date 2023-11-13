const Discord = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const op = require('os');

module.exports = {
    name: "systeminfo",
    aliases: ["system"],
    cooldown: 10,
    async execute(message, args, data, client) {
        const { totalMemMb, usedMemMb } = await mem.info();

        const systeminfo = stripIndent`
        OS        : Ubuntu 20.04 LTS - RPI4B
        CPU       : ${cpu.model()}
        Cores     : ${cpu.count()}
        CPU Usage : ${await cpu.usage()} %
        RAM       : ${totalMemMb} MB
        RAM Usage : ${usedMemMb} MB 
        `;

        const embed = new Discord.MessageEmbed()
            .setTitle(`My host system information.`)
            .setDescription(`\`\`\`yaml\n${systeminfo}\`\`\``)
            .setTimestamp()
            .setColor('GREY');

        message.channel.send({ embeds: [embed] })
    },
};