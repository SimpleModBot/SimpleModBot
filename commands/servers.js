const Discord = require("discord.js");

module.exports = {
    name: 'servers',
    description: 'Shows the current amount of servers the bot is in, in an embed.',
    async execute(message, args, client) {

        let clientServers = await client.guilds.cache.size;
        let serverMembers = await client.users.cache.size;

        const serverEmbed = new Discord.MessageEmbed()
            .setTitle(`Server/Member Counter:`)
            .addField('**Server Amount:**', `${clientServers}`)
            .addField('**Member Amount:**', `${serverMembers}`)
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