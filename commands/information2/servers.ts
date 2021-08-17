const Discord = require("discord.js");

module.exports = {
    name: 'servers',
    description: 'Shows the current amount of servers the bot is in, in an embed.',
    async execute(message, args, data, client) {

        let clientServers = await client.guilds.cache.size;

        const serverEmbed = new Discord.MessageEmbed()
            .setTitle(`Server Counter:`)
            .addField('**Server Count:**', `${clientServers}`)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setColor("#4daf8")
            .setTimestamp();

        try {
            message.channel.send({ embeds: [serverEmbed] });
        } catch (err) {
            Promise.reject(new err);
        }

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};