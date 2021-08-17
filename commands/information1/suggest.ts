const Discord = require("discord.js");

module.exports = {
    name: 'suggest',
    description: 'Gives a suggestion in the current channel with a reaction vote counter.',
    async execute(message, args, data, client) {
        let suggestion = args.join(" ");
        if (!args[0]) return message.channel.send({ content: "You must state something to suggest." });
        const embed = new Discord.MessageEmbed()
            .setTitle(`Suggestion:`)
            .addField(`${suggestion}`, `This was suggested by ${message.author.tag}`);

        message.channel.send({ embeds: [embed] })
            .then((sentMessage) => sentMessage.react("👍"))
            .then((reaction) => reaction.message.react("👎"));

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};