const Discord = require("discord.js");

module.exports = {
    name: 'servers',
    description: 'Shows the current amount of servers the bot is in, in an embed.',
    async execute(message, args, client) {

        let serverIn = await client.guilds.cache.size;
        const serverEmbed = new Discord.MessageEmbed()
            .setTitle(`Number of Servers I'm in:`)
            .setDescription(`${serverIn}`)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setColor("#4daf8")
            .setTimestamp();

        try {
            message.channel.send(serverEmbed);
        } catch (err) {
            console.log(err);
            message.channel.send("I am unable to send the embed counter.");
        }

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};