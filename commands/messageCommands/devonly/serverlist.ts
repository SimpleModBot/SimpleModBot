const Discord = require('discord.js');
const ascii = require('ascii-table');
let Table = new ascii("ServerList");

module.exports = {
    name: "serverlist",
    aliases: ["sl"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        Table.setHeading(" Guild Name ", " Guild ID ", " Member Count ", " Owner ");

        await client.guilds.cache.forEach(async guild => {
            await client.users.fetch(guild.ownerId).then(async user => {
                const owner = user.tag;
                await Table.addRow(` ${guild.name} `, ` ${guild.id} `, ` ${guild.memberCount} Users `, ` ${owner} `);
            });
        });

        await console.log(Table.toString());
        await require("log4js").getLogger(`info`).info(Table.toString());
        message.channel.send({ content: "I have logged the servers." });
    },
};