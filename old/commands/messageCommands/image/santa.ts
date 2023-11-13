const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name: 'santa',
    async execute(message, args, data, client) {
        let say = message.content.split(" ").slice(1).join(" ");
        if (!say) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('You need to say something to put on the image!').setColor('GREY')] });

        const canvas = Canvas.createCanvas(641, 617);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('./utils/images/santa.png');

        ctx.drawImage(background, 0, 0, 641, 617);
        ctx.font = '32px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.fillText(`${say}`, canvas.width / 10, canvas.height / 1.65);
        ctx.textAlign = "center";

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'santa.png');
        message.channel.send({ files: [attachment] });
    },
};