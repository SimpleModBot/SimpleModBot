const Discord = require('discord.js');

module.exports = {
    name: "error",
    async execute(err, client) {
        require("log4js").getLogger(`default`).error(err);

        const errorChannel = client.channels.cache.get("832744410998767666");
        const errorMessage = new Discord.MessageEmbed()
            .setTitle("An error has occured!")
            .setDescription("** **" + err)
            .setTimestamp()
            .setColor("#ff0a0a");

        errorChannel.send({ embeds: [errorMessage] });
    },
};