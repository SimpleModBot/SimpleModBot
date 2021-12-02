const Discord = require('discord.js');
const nf = require("node-fetch");

module.exports = {
    name: "webss",
    aliases: ['wss'],
    cooldown: 10,
    DMU: true,
    async execute(message, args, data, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Command Error:")
            .setDescription(`> __You need to give a valid website link for this to work.__
            > An example is: \`${client.prefix}webss https://sites.google.com/view/simplemodbot/main\``)
            .setColor("GREY")
            .setTimestamp();

        if (args[0] == "ENA") return message.channel.send({ embeds: [embed] });
        let web = args[0].toLowerCase();
        if (!web.startsWith("https://")) return message.channel.send({ embeds: [embed] });
        if (web.length < 12) return message.channel.send({ embeds: [embed] });
        let ping = Date.now();

        await nf(`https://smbwss.up.railway.app/?url=${web}&checkNsfw=yes`, {
            method: 'get',
        }).then((res) => res.arrayBuffer()).then((str) => {
            var Bytes = Buffer.from(str, "utf-8");

            ping = (Date.now() - ping) / 1000;
            const image = new Discord.MessageAttachment(Bytes, 'image.png');
            message.channel.send({ content: `Website image for **${web}**\nTook **${ping}** seconds to fetch.`, files: [image] });
        });
    },
};