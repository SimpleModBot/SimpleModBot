const Discord = require('discord.js');
const Ping = require('../../../database/models/pingSchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: 'ping',
    description: 'Shows the bots ping.',
    cooldown: 5,
    async execute(message, args, data, client) {
        let Uptime = await client.functions.getUptime();

        const pingingEmbed = new Discord.MessageEmbed()
            .setTitle("Pinging...")
            .setDescription("This might take a bit.")
            .setFooter(`${message.author.tag.slice(0, -5)} used ping command.`)
            .setColor("GREY");

        message.channel.send({ embeds: [pingingEmbed] }).then(async (resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;
            const Past = Date.now();
            await new Ping({
                _id: mongoose.Types.ObjectId(),
                pings: 1
            });
            const dbPing = Date.now() - Past;

            let MESSAGE = "__Message Broke Lmao, if the color is white then that broke too btw.__";
            let COLOR = "WHITE";

            if (ping < 501 && ping > 0) {
                MESSAGE = "__That's some nice ping.__",
                    COLOR = "GREEN"
            };
            if (ping < 701 && ping > 500) {
                MESSAGE = "__Average ping.__",
                    COLOR = "GREEN"
            };
            if (ping < 1101 && ping > 700) {
                MESSAGE = "__It just does that sometimes..__",
                    COLOR = "YELLOW"
            };
            if (ping > 1100) {
                MESSAGE = "__Hey, uhh.. I think something's wrong?__",
                    COLOR = "RED"
            };

            const pongEmbed = new Discord.MessageEmbed()
                .setTitle("🏓Pong!")
                .setDescription(`${MESSAGE}\n> Response: ${ping}ms
                > Database: ${dbPing}ms
                > Discord: ${client.ws.ping}ms
                > 💖 Uptime: ${Uptime}`)
                .setFooter(`${message.author.tag.slice(0, -5)} used ping command.`)
                .setColor(COLOR);

            resultMessage.edit({ embeds: [pongEmbed] });
        });
    },
};