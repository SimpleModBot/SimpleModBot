const schema = require('../../../database/models/ccSchema.ts');
const mongoose = require("mongoose");
const Discord = require('discord.js');

module.exports = {
    name: 'cc-create',
    cooldown: 10,
    async execute(message, args, a, client) {
        if (!message.member.permissions.has('MANAGE_MESSAGES') && message.author.id !== client.ownerID) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('You do not have permission to use this command').setColor('GREY')] });
        const name = args[0];
        const response = args.slice(1).join(" ");

        if (name == "ENA") return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('Please specify a command name.').setColor('GREY')] });
        if (await client.messageCommands.get(name)) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You can't overwrite a base command!").setColor('GREY')] });
        if (!response) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('Please specify a response.').setColor('GREY')] });

        const m = await schema.find({});
        if (m.length > 19) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription('You have 20 custom commands which is the limit!').setColor('GREY')] });

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if (data) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('This command already exists!').setColor('GREY')] });
        const newData = new schema({
            _id: new mongoose.Types.ObjectId,
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();

        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Saved *\`${name}\`* as a custom command!`).setColor('GREY')] });
    },
};