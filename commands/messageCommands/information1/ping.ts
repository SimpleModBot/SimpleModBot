const Discord = require('discord.js');
const Ping = require('../../../database/models/pingSchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: 'ping',
    description: 'Shows the bots ping.',
    DMU: true,
    cooldown: 5,
    async execute(message, args, data, client) {
        const pingingEmbed = new Discord.MessageEmbed()
            .setTitle("Pinging...")
            .setDescription("This might take a bit.")
            .setFooter(`${message.author.tag.slice(0, -5)} used ping command.`)
            .setColor("#fffb14");

        const Past = Date.now();
        message.channel.send({ embeds: [pingingEmbed] }).then(async (resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;
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
                .setDescription(`${MESSAGE}\n> <:BotDev:832344818453184522> Bot: ${ping}ms
                > <:mongoDB:870855924129079356> Database: ${dbPing}ms
                > <:DiscordApp:870856184456949761> API: ${client.ws.ping}ms`)
                .setFooter(`${message.author.tag.slice(0, -5)} used ping command.`)
                .setColor(COLOR);

            resultMessage.edit({ embeds: [pongEmbed] });
        });
    },
};