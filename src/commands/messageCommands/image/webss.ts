const Discord = require('discord.js');
const nf = require("node-fetch");
const fs = require('fs');

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

        // const webURL = args[0] || null;
        // const fp = (args[1] === 'true') || false;
        // var am = fs.readdirSync('./utils/tmp').length;

        // if (webURL === null) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Missing website link in first argument.`).setColor('GREY')], allowedMentions: { repliedUser: false } });

        // const browser = await puppeteer.launch({ headless: false, timeout: 15000, });
        // const page = await browser.newPage();

        // page.setViewport({ width: 1920, height: 1080 });
        // await page.goto(webURL.includes("https://") ? webURL : `https://${webURL}`);
        // await page.screenshot({
        //     path: `./utils/tmp/screenshot${am}.png`,
        //     type: 'png',
        //     fullPage: fp
        // });

        // await message.channel.send({
        //     embeds: [new Discord.MessageEmbed().setDescription(`Screenshot for ${webURL}.\nCompleted in: ${Math.round((new Date().getTime() - message.createdTimestamp) / 1000)} seconds.`).setImage(`attachment://screenshot${am}.png`).setColor('GREY')],
        //     files: [`./utils/tmp/screenshot${am}.png`],
        //     allowedMentions: { repliedUser: false },
        // });

        // await browser.close();
        // fs.unlinkSync(`./utils/tmp/screenshot${am}.png`);
    },
};