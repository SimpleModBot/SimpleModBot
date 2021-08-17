const schema = require('../../../database/models/ccSchema.ts');

module.exports = {
    name: 'cc-delete',
    aliases: ['cc-remove'],
    cooldown: 10,
    async execute(message, args, a, client) {
        if (!message.member.permissions.has('ADMINISTRATOR') && message.author.id !== client.ownerID) return message.channel.send({ content: 'You do not have permission to use this command.' });

        const name = args[0];
        if (name == "ENA") return message.channel.send({ content: 'Please specify a command.' });

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if (!data) return message.channel.send({ content: 'That custom command does not exist!' });
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });

        message.channel.send({ content: `Removed **${name}** from custom commands!` });
    },
};