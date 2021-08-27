const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name: 'bench',
    async execute(message, args, data, client) {
        let say = message.content.split(" ").slice(1).join(" ");
        if (!say) return message.channel.send('You need to say something to put on the image!');

        const canvas = Canvas.createCanvas(670, 347);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('./utils/images/bench.png');

        ctx.drawImage(background, 0, 0, 670, 347);
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.fillText(`${say}`, 280, 265);
        ctx.textAlign = "center";

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'bench.png');
        message.channel.send({ files: [attachment] });
    },
};