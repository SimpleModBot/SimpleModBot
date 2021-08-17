const Discord = require('discord.js');
const jimp = require('jimp');

module.exports = {
    name: "bonk",
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!user) return message.reply({ content: `Please mention a user from this guild to bonk.` })

        const bonk = await jimp.read(`${__dirname}/../../../utils/images/bonk.jpeg`);
        const userAv = await jimp.read(message.author.displayAvatarURL({ format: "jpeg" }));
        const userToBonkAv = await jimp.read(user.user.displayAvatarURL({ format: "jpeg" }));

        userAv.circle();
        userToBonkAv.circle();
        bonk.resize(1000, 500);
        userAv.resize(220, 220);
        userToBonkAv.resize(200, 200);
        bonk.composite(userAv, 200, 50);
        bonk.composite(userToBonkAv, 650, 300);

        bonk.getBuffer(`image/jpeg`, (err, buffer) => {
            const bonked = new Discord.MessageAttachment(buffer, "bonk.jpeg");
            const embed = new Discord.MessageEmbed()
                .setColor(message.guild.me.displayHexColor)
                .setTitle(`${message.author.username} has bonked ${user.user.username}!`)
                .attachFiles(bonked)
                .setImage("attachment://bonk.jpeg");

            return message.channel.send({ embeds: [embed] });
        });
    },
};