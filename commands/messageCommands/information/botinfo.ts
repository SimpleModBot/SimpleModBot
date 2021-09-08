const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "botinfo",
    aliases: ["clientinfo"],
    cooldown: 5,
    async execute(message, args, data, client) {
        let usersCount = 0;
        for (const guild of client.guilds.cache) {
            usersCount += (await guild[1].members.fetch()).size
        }

        let Days = Math.floor(client.uptime / 86400000);
        let Hours = Math.floor(client.uptime / 3600000) % 24;
        let Minutes = Math.floor(client.uptime / 60000) % 60;
        let Seconds = Math.floor(client.uptime / 1000) % 60;
        const RemoveUseless = (Duration) => {
            return Duration.replace("0 Day\n", "").replace("0 Hour\n", "").replace("0 Minute\n", "");
        }

        const Developer = client.users.cache.get(client.ownerID)
        let Uptime = await RemoveUseless(`${Days}${Days > 1 ? "d" : "d"} ${Hours}${Hours > 1 ? "h" : "h"} ${Minutes}${Minutes > 1 ? "m" : "m"} ${Seconds}${Seconds > 1 ? "s" : "s"}`);

        const embed = new Discord.MessageEmbed()
            .setTitle(`Client Information`)
            .addField(`Name | ID`, `\`\`\`${client.user.tag}\n${client.user.id}\`\`\``, true)
            .addField(`Client Guild Count`, `\`\`\`${client.guilds.cache.size} Servers\`\`\``, true)
            .addField(`Client Channel Count`, `\`\`\`${client.channels.cache.size} Channels\`\`\``, true)
            .addField(`Client User Count`, `\`\`\`${usersCount} Users\`\`\``, true)
            .addField(`Made Using`, `\`\`\`Discord.js\nNode.js\nMongoDB\`\`\``, true)
            .addField(`Creation Date`, `\`\`\`${moment.utc(client.user.createdAt).format('DD/MMM/YYYY')}\`\`\``, true)
            .addField(`Bot Ping`, `\`\`\`Latency: ${Date.now() - message.createdTimestamp} ms\nAPI Latency: ${Math.round(client.ws.ping)} ms\`\`\``, true)
            .addField(`Commands Number`, `\`\`\`${client.messageCommands.size} messageCommands\n${client.slashCommands.size} slashCommands\`\`\``, true)
            .addField(`Prefix`, `\`\`\`${client.prefix}\`\`\``, true)
            .addField(`Uptime`, `\`\`\`${Uptime}\`\`\``, true)
            .addField(`Developer`, `\`\`\`${Developer.tag}\n${client.ownerID}\`\`\``, true)
            .addField(`Bot Links`, `Bot Invite [https://top.gg/bot/808196506833125396]\nSupport/Community Server [https://discord.gg/26NtPVvNCU]`)
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setColor('GREY')
            .setTimestamp();

        message.channel.send({ embeds: [embed] })
    },
};