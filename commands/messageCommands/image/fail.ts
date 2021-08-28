const Discord = require('discord.js');
const jimp = require('jimp');

module.exports = {
    name: "fail",
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!user) return message.reply({ content: `Please mention a user from this guild to make a failure.` })

        const bonk = await jimp.read(`${__dirname}/../../../utils/images/fail.png`);
        const userToBonkAv = await jimp.read(user.user.displayAvatarURL({ format: "png" }));

        userToBonkAv.circle();
        bonk.resize(750, 600);
        userToBonkAv.resize(620, 410);
        bonk.composite(userToBonkAv, 65, 45);

        bonk.getBuffer(`image/png`, (err, buffer) => {
            const bonked = new Discord.MessageAttachment(buffer, "fail.png");
            return message.channel.send({ files: [bonked] });
        });
    },
};