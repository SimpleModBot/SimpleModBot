// @ts-ignore
const Discord = require('discord.js');
const mongoose = require('mongoose');
const Ping = require('../../../database/models/pingSchema.ts');

module.exports = {
    name: 'ping',
    description: 'Shows the bot ping!',
    async execute(interaction, args, client) {
        interaction.reply({ content: "Sending the ping embed.", ephemeral: true });
        let Uptime = await client.functions.getUptime();

        const pingingEmbed = new Discord.MessageEmbed()
            .setTitle("Pinging...")
            .setDescription("This might take a bit.")
            .setFooter({ text: `${interaction.user.tag.slice(0, -5)} used ping command.` })
            .setColor("GREY");

        interaction.channel.send({ embeds: [pingingEmbed] }).then(async (resultMessage) => {
            const ping = resultMessage.createdTimestamp - interaction.createdTimestamp;
            const Past = Date.now();
            await new Ping({
                _id: mongoose.Types.ObjectId(),
                pings: 1
            });
            const dbPing = Date.now() - Past;

            let MESSAGE = "Message Broke Lmao, if the color is grey then that broke too btw.";
            let COLOR = "GREY";

            if (ping < 501 && ping > 0) {
                MESSAGE = "That's some nice ping.",
                    COLOR = "GREEN"
            };
            if (ping < 701 && ping > 500) {
                MESSAGE = "Average ping.",
                    COLOR = "GREEN"
            };
            if (ping < 1101 && ping > 700) {
                MESSAGE = "It just does that sometimes..",
                    COLOR = "YELLOW"
            };
            if (ping > 1100) {
                MESSAGE = "Hey, uhh.. I think something's wrong?",
                    COLOR = "RED"
            };

            const pongEmbed = new Discord.MessageEmbed()
                .setTitle("🏓Pong!")
                .setDescription(MESSAGE)
                .addField(`Response`, `${ping}ms`, true)
                .addField(`Discord`, `${client.ws.ping}ms`, true)
                .addField(`Database`, `${dbPing}ms`, true)
                .addField(`💖 Uptime`, `${Uptime}`)
                .setFooter({ text: `${interaction.user.tag.slice(0, -5)} used ping command.` })
                .setColor(COLOR);

            resultMessage.edit({ embeds: [pongEmbed] });
        });
    },
};