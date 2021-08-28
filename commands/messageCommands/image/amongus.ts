const Discord = require('discord.js');
const jimp = require('jimp');

module.exports = {
    name: "amongus",
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!user) return message.reply({ content: `Please mention a user from this guild to make into among us.` })

        const bonk = await jimp.read(`${__dirname}/../../../utils/images/amongus.png`);
        const userToBonkAv = await jimp.read(user.user.displayAvatarURL({ format: "png" }));

        userToBonkAv.circle();
        bonk.resize(500, 500);
        userToBonkAv.resize(290, 180);
        bonk.composite(userToBonkAv, 200, 65);

        bonk.getBuffer(`image/png`, (err, buffer) => {
            const bonked = new Discord.MessageAttachment(buffer, "amongus.png");
            return message.channel.send({ files: [bonked] });
        });
    },
};