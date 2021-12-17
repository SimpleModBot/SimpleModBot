// @ts-ignore
const Discord = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
    name: 'help',
    description: 'Gain knowledge here.',
    userPermissions: ['SEND_MESSAGES'],
    botPermissions: ['SEND_MESSAGES'],
    options: [
        {
            name: 'cmd',
            description: 'The command to view information on.',
            type: 'STRING',
            required: false,
        },
    ],
    async execute(interaction, args, client) {
        const [cmd] = args;
        const roleColor = "#000000" ? "GREY" : interaction.guild.me.displayHexColor;

        if (!cmd) {
            let categories = [];

            readdirSync("./commands/slashCommands/").forEach((dir) => {
                const commands = readdirSync(`./commands/slashCommands/${dir}/`).filter((file) => file.endsWith(".ts"));

                const cmds = commands.map((command) => {
                    let file = require(`../${dir}/${command}`);
                    if (!file.name) return "No command name.";
                    let name = file.name.replace(".ts", "");

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "In progress." : cmds.join(" "),
                    inline: true,
                };

                categories.push(data);
            });

            let pages = [];
            for (const category of categories) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(category.name)
                    .setDescription(`Use \`/help <command>\` to get more information on the command.\nExample: \`/help ban\``)
                    .addField(category.name, category.value)
                    .setFooter(`If you like me please invite me to your server with the button on my profile!`, interaction.member.displayAvatarURL({ dynamic: true }))
                    .setColor(roleColor || "GRAY")
                    .setTimestamp();

                pages.push(embed);
            };

            client.functions.spaginate(interaction, pages);
        } else {
            const command = client.slashCommands.get(cmd.toLowerCase());

            if (!command) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Invalid command! Use \`/help\` to view all commands.`)
                    .setColor("GREY");

                return interaction.reply({ embeds: [embed], ephemeral: true });
            };

            const embed = new Discord.MessageEmbed()
                .setTitle("Command Details:")
                .addField("COMMAND:", command.name ? `> \`${command.name}\`` : "> Unnamed command??")
                .addField("DESCRIPTION:", command.description ? `> ${command.description}` : "> No description.")
                .setFooter(`If you like me please invite me to your server with the button on my profile!`, interaction.member.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(roleColor);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        };
    },
};