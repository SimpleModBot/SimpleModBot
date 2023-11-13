const Discord = require('discord.js');

module.exports = {
    name: "restart",
    aliases: ["shut", "res"],
    devOnly: true,
    async execute(message, args, data, client) {
        console.clear();
        await message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Reloading client..").setColor('GREY')] });
        await client.destroy();
        process.exit();

        // await client.destroy();
        // const slash = require('./utils/handlers/slashCommand.ts');
        // slash(client);
        // await client.login(process.env.TOKEN);
        // message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Recreated the client.`).setColor('GREY')], allowedMentions: { repliedUser: false } });
    },
};