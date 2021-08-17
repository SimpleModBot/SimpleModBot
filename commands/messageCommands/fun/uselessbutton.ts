const disbut = require("discord.js");

module.exports = {
    name: "uselessbutton",
    aliases: ["ub"],
    async execute(message, args, data, client) {
        const ub = new disbut.MessageButton()
            .setCustomId("uselessbutton")
            .setStyle("green")
            .setLabel("The Useless Button");

        message.channel.send({ content: "Heres a useless button:", component: ub });
    },
};