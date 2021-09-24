const Discord = require('discord.js');
const glob = require('glob');

module.exports = {
    name: "test",
    aliases: ["t"],
    devOnly: true,
    async execute(message, args, data, client) {
        glob(`${__dirname}/../**/*.ts`, async (err, fp) => {
            if (err) Promise.reject(new err);

            client.messageCommands.sweep(() => true);
            fp.forEach(f => {
                delete require.cache[require.resolve(f)];
                const pull = require(f);

                if (pull.name) {
                    client.messageCommands.set(pull.name, pull);
                }
            });
        });

        message.reply({ embeds: [new Discord.MessageEmbed().setDescription('Successfully reloaded all commands!').setColor('GREY')] });
    },
};