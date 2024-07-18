const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
// @ts-ignore
const Discord = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "Gain knowledge here.",
    cooldown: 5,
    DMU: true,
    async execute(message, args, data, client) {
        const prefix = client.prefix;
        const roleColor = "#000000" ? "GREY" : message.guild.me.displayHexColor;

        if (args[0] == 'ENA') {
            let categories = [];

            readdirSync("./commands/messageCommands/").forEach((dir) => {
                const commands = readdirSync(`./commands/messageCommands/${dir}/`).filter((file) => file.endsWith(".ts"));

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
                    .setDescription(`Use \`${client.prefix}help <command>\` to get more information on the command.\nExample: \`${client.prefix}help ban\``)
                    .addField(category.name, category.value)
                    .setFooter({ text: `If you like me please invite me to your server with the button on my profile!`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor(roleColor || "GRAY")
                    .setTimestamp();

                pages.push(embed);
            };

            client.functions.paginate(message, pages);
        } else {
            const command = client.messageCommands.get(args[0].toLowerCase()) || client.messageCommands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid command! Use \`${prefix}help\` to view all commands.`)
                    .setColor("GREY");

                return message.channel.send({ embeds: [embed] });
            };

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField("COMMAND:", command.name ? `> \`${command.name}\`` : "> Unnamed command??")
                .addField("DESCRIPTION:", command.description ? `> ${command.description}` : "> No description.")
                .addField("ALIASES:", command.aliases ? `> \`${command.aliases.join("`, `")}\`` : "> No aliases.")
                .setFooter({ text: `If you like me please invite me to your server with the button on my profile!`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
                .setColor(roleColor);

            return message.channel.send({ embeds: [embed] });
        };
    },
};
