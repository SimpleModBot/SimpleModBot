const Discord = require("discord.js");


module.exports = {
    name: 'calculate',
    cooldown: 5,
    aliases: ['calc'],
    description: 'Does simple math for you.',
    async execute(message, args, client) {

        const firstvalue = Number(args[0]);
        const secondvalue = Number(args[2]);

        if (!args[0]) return message.channel.send(`You need to give more arguments: ${client.prefix}calc <number> [+, -, x, /] <number>`);
        if (!firstvalue) return message.channel.send("The first value is not a number.");
        if (!args[1]) return message.channel.send("You need to say what method to use for calculation");
        if (!["+", "-", "x", "/"].includes(args[1])) return message.channel.send("You need to say a proper method of calculating: `+, -, x, /`");
        if (!secondvalue) return message.channel.send("The second value is not a number.");

        if (args[1] == "+") {
            let result = firstvalue + secondvalue;
            const mathPlusEmbed = new Discord.MessageEmbed()
                .setTitle("`Calculate` command.")
                .setDescription(`${firstvalue} + ${secondvalue} = ${result}`)
                .setColor("GREEN")
                .setFooter(`${message.author.tag} used Calculate command`);
            message.channel.send(mathPlusEmbed);
        }
        if (args[1] == "-") {
            let result = firstvalue - secondvalue;
            const mathSubractEmbed = new Discord.MessageEmbed()
                .setTitle("`Calculate` Command.")
                .setDescription(`${firstvalue} - ${secondvalue} = ${result}`)
                .setColor("GREEN")
                .setFooter(`${message.author.tag} used Calculate command`);
            message.channel.send(mathSubractEmbed);
        }
        if (args[1] == "x") {
            let result = firstvalue * secondvalue;
            const mathMultiplyEmbed = new Discord.MessageEmbed()
                .setTitle("`Calculate` Command.")
                .setDescription(`${firstvalue} X ${secondvalue} = ${result}`)
                .setColor("GREEN")
                .setFooter(`${message.author.tag} used Calculate command`);
            message.channel.send(mathMultiplyEmbed);
        }
        if (args[1] == "/") {
            let result = firstvalue / secondvalue;
            const mathDivideEmbed = new Discord.MessageEmbed()
                .setTitle("`Calculate` Command.")
                .setDescription(`${firstvalue} ÷ ${secondvalue} = ${result}`)
                .setColor("GREEN")
                .setFooter(`${message.author.tag} used Calculate command`);
            message.channel.send(mathDivideEmbed);
        }
    },
};