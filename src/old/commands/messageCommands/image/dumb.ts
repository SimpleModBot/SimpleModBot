const Discord = require('discord.js');
const jimp = require('jimp');

module.exports = {
    name: "dumb",
    async execute(message, args, data, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!user) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Please mention a user from this guild to make into a dumb ass.`).setColor('GREY')] })

        const bonk = await jimp.read(`${__dirname}/../../../utils/images/dumb.png`);
        const userToBonkAv = await jimp.read(user.user.displayAvatarURL({ format: "png" }));

        userToBonkAv.circle();
        bonk.resize(1980, 1080);
        userToBonkAv.resize(1445, 800);
        bonk.composite(userToBonkAv, 265, 135);

        bonk.getBuffer(`image/png`, (err, buffer) => {
            const bonked = new Discord.MessageAttachment(buffer, "dumb.png");
            return message.channel.send({ files: [bonked] });
        });
    },
};