const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name: 'sadbirthdaycat',
    aliases: ['sbc'],
    description: "Sends an image of a sad birthday cat with your text.",
    async execute(message, args, data, client) {
        let say = message.content.split(" ").slice(1).join(" ");
        if (!say) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('You need to say something to put on the image!').setColor('GREY')] });
        const canvas = Canvas.createCanvas(497, 657);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://github.com/katie07/Imagayes/blob/main/SED.png?raw=true');
        ctx.drawImage(background, 0, 0, 497, 657);
        ctx.font = '32px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${say}`, canvas.width / 2.0, canvas.height / 1.3);
        ctx.textAlign = "center";

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sad.jpg');
        message.channel.send({ files: [attachment] });
    },
};