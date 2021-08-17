const schema = require('../../database/models/ccSchema.ts');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cc-list",
    cooldown: 5,
    async execute(message, args, a, client) {
        const data = await schema.find({ Guild: message.guild.id });
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription(data.map((cmd) => `● ${cmd.Command}`).join('\n') + "\u200b")
                    .setColor('GREY')
            ]
        });
    },
};