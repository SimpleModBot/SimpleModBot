const Discord = require('discord.js');

module.exports = {
    name: "daily",
    cooldown: 86400,
    async execute(message, args, data, client) {
        const moneys = Math.floor(Math.random() * 15000) + 5000;
        const balance = await client.data.getBalanceDB(message.author.id);
        if (!balance) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You need to create a wallet. You can do this by using the `balance`/`bal` command.").setColor('GREY')] });
        balance.balance = balance.balance + moneys;
        await balance.save();
        message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You have collected \`$${moneys}\` from your daily cash!`).setColor('GREY')] });
    },
};