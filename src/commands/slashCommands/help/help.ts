const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const Discord = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with the bot help menu.')
        .addStringOption(opt =>
            opt.setName('command')
                .setDescription("Command you want to view more info for.")),
    async execute(interaction, client) {
        interaction.reply({ content: "Sending the help menu.", ephemeral: true });

        const prefix = client.prefix;
        const roleColor = interaction.guild.me.displayHexColor === "#000000" ? "GREY" : interaction.guild.me.displayHexColor;
        const args = interaction.options.getString('command') || "ENA";

        if (args == "ENA") {
            let categories = [];
            readdirSync("./commands/messageCommands/").forEach((dir) => {
                const commands = readdirSync(`./commands/messageCommands/${dir}/`).filter((file) => file.endsWith(".ts"));

                const cmds = commands.map((command) => {
                    let file = require(`../../messageCommands/${dir}/${command}`);
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
                    .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setColor(roleColor || "GRAY")
                    .setTimestamp();

                pages.push(embed);
            };
            let position = 0;

            const previous = new MessageButton()
                .setLabel("")
                .setStyle("SECONDARY")
                .setEmoji("◀️")
                .setCustomId("previous");

            const next = new MessageButton()
                .setLabel("")
                .setStyle("SECONDARY")
                .setEmoji("▶️")
                .setCustomId("next");

            const paginationbuttons = new MessageActionRow()
                .addComponents(previous, next);

            const endedP = new MessageButton()
                .setLabel("")
                .setStyle("SECONDARY")
                .setEmoji("◀️")
                .setCustomId("previous")
                .setDisabled();

            const endedN = new MessageButton()
                .setLabel("")
                .setStyle("SECONDARY")
                .setEmoji("▶️")
                .setCustomId("previous")
                .setDisabled();

            const endedbuttons = new MessageActionRow()
                .addComponents(endedP, endedN);

            function checkPos() {
                previous.setDisabled(position === 0 ? true : false);
                next.setDisabled(position === Object.keys(pages).length - 1 ? true : false);
            };

            checkPos();
            const pagination = await interaction.channel.send({
                embeds: [pages[position]],
                components: [paginationbuttons]
            });

            const collector = pagination.componentCollector(
                {
                    componentType: "BUTTON",
                    time: 60000
                });

            collector.on("collect", async (button) => {
                if (button.user.id === interaction.user.id) {
                    if (button.customId === "previous" && position > 0) position = position - 1;
                    if (button.customId === "next" && position < pages.length - 1) position = position + 1;
                    checkPos();
                    await pagination.edit({
                        content: "\u200b",
                        embeds: [pages[position]],
                        components: [paginationbuttons]
                    });
                    await button.deferUpdate();
                } else {
                    button.reply({ content: `Hey, ${button.user.username}, these buttons aren't for you to use!`, ephemeral: true });
                };
            });

            collector.on("end", async (collected) => {
                await pagination.edit(`Timed out.`, {
                    content: "\u200b",
                    embeds: [pages[position]],
                    components: [endedbuttons]
                });
            });
        } else {
            const command = client.messageCommands.get(args.toLowerCase()) || client.messageCommands.find((c) => c.aliases && c.aliases.includes(args.toLowerCase()));

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid command! Use \`${prefix}help\` to view all commands.`)
                    .setColor("FF0000");

                return interaction.channel.send({ embeds: [embed] });
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField("COMMAND:", command.name ? `> \`${command.name}\`` : "> Unnamed command??")
                .addField("DESCRIPTION:", command.description ? `> ${command.description}` : "> No description.")
                .addField("ALIASES:", command.aliases ? `> \`${command.aliases.join("` `")}\`` : "> No aliases.")
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(roleColor);

            return interaction.channel.send({ embeds: [embed] });
        };
    },
};