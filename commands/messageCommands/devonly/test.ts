const Discord = require('discord.js');

module.exports = {
    name: "test",
    aliases: ["t"],
    devOnly: true,
    async execute(message, args, data, client) {
        try {
            await eval('throw new Error("wtf")');
        } catch (err) {
            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`\`ERROR\` \`\`\`ts\n${err}\n\`\`\``).setColor('GREY')] });
        };
    },
};