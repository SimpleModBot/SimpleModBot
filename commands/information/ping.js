const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Shows the bots ping.',
    async execute(message, args, client) {
        const pingingEmbed = new Discord.MessageEmbed()
            .setTitle("Pinging...")
            .setDescription("This will probably take a bit.")
            .setFooter(`${message.author.tag} used ping command.`)
            .setColor("#fffb14");
        message.channel.send(pingingEmbed).then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;

            const pongEmbed = new Discord.MessageEmbed()
                .setTitle("🏓Pong!")
                .setDescription(`Bot ping: ${ping}ms\nAPI ping: ${client.ws.ping}ms`)
                .setFooter(`${message.author.tag} used ping command.`)
                .setColor("GREEN");
            resultMessage.edit(pongEmbed);
        })
        
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};