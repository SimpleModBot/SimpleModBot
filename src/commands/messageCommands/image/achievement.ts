const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "achievement",
    description: "Gives you an achievment",
    aliases: ["ach"],
    async execute(message, args, data, client) {
        const text = args.join("+");
        if (text == 'ENA') return message.channel.send("Give me some text idiot.");

        const e = new MessageEmbed()
            .setTitle("MineCraft achievement!")
            .setImage(`https://minecraftskinstealer.com/achievement/12/Achievement%20Get!/${text}`)
            .setColor('GREY');
        
        message.channel.send({ embeds: [e] });
    },
};