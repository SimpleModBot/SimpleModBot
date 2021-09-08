const Discord = require('discord.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.channel) return;
        if (!interaction.isCommand()) return;
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            require("log4js").getLogger(`default`).error(error);

            const errorChannel = client.channels.cache.get("832744410998767666");
            const errorMessage = new Discord.MessageEmbed()
                .setTitle("An error has occured!")
                .setDescription("\u200b" + error)
                .setTimestamp()
                .setColor("#ff0a0a");

            errorChannel.send({ embeds: [errorMessage] });
            interaction.channel.send({ content: "An error occured within the bot. If you are a dev or log viewer please review the error in <#832744410998767666>", ephemeral: true });
        }
    },
};