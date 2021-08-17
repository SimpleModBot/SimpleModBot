const { MessageButton } = require("discord.js");

module.exports = {
    name: "dontclick",
    async execute(message, args, data, client) {
        const button = new MessageButton()
            .setCustomId("fyou")
            .setStyle("red")
            .setLabel("Don't Click Me.");

        message.channel.send({ content: "Don't click the button.", component: button });
    },
};