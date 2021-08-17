const schema = require('../../database/models/ccSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: 'cc-create',
    cooldown: 10,
    async execute(message, args, a, client) {
        if (!message.member.permissions.has('ADMINISTRATOR') && message.author.id !== client.ownerID) return message.channel.send({ content: 'You do not have permission to use this command' });
        const name = args[0]; const response = args.slice(1).join(" ");

        if (name == "ENA") return message.channel.send({ content: 'Please specify a command name.' });
        if (await client.commands.get(name)) return message.channel.send({ content: "You can't overwrite a base command!" });
        if (!response) return message.channel.send({ content: 'Please specify a response.' });

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if (data) return message.channel.send({ content: 'This command already exists!' });
        const newData = new schema({
            _id: new mongoose.Types.ObjectId,
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();

        message.channel.send({ content: `Saved *\`${name}\`* as a custom command!` });
    },
};