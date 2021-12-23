const { MessageButton, MessageActionRow, MessageEmbed, MessageSelectMenu } = require("discord.js");
// @ts-ignorecaptcha currently
const Discord = require("discord.js");

module.exports = {
    name: "eval",
    aliases: ['e'],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        const old = Date.now();

        let NValidEVAL = new MessageEmbed()
            .addField("Executor", `<@${message.author.id}>`)
            .addField("Command output", `\`\`\`diff\nError: Invalid Usage\`\`\``)
            .addField("Usage:", `\`\`\`diff\n ${client.prefix}eval <code>\`\`\``)
            .setAuthor("Invalid Usage.")
            .setColor("GREY");

        if (args[0] == "ENA") return message.channel.send({ embeds: [NValidEVAL] });

        try {
            let code = args.join(" ");

            let evaled = await eval(code);
            let rawEvaled = evaled;
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { "depth": 0 });

            let dataType = Array.isArray(rawEvaled) ? "Array<" : typeof rawEvaled, dataTypes = [];
            if (~dataType.indexOf("<")) {
                rawEvaled.forEach(d => {
                    if (~dataTypes.indexOf(Array.isArray(d) ? "Array" : typeof d)) return;
                    dataTypes.push(Array.isArray(d) ? "Array" : typeof d);
                });
                dataType += dataTypes.map(s => s[0].toUpperCase() + s.slice(1)).join(", ") + ">";
            };

            let pages = [];

            if (evaled.length > 1000) {
                const variable = client.functions.splitLength(evaled, 1000);
                variable.forEach(v => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Evaluated in ${Math.round(Date.now() - old)}ms`)
                        .addField("[INPUT]", `\`\`\`ts\n${code}\n\`\`\``)
                        .setDescription("**[OUTPUT]**" + `\n\`\`\`ts\n${v}\n\`\`\``)
                        .addField('[TYPE]', `\`\`\`xl\n${(dataType).substr(0, 1).toUpperCase() + dataType.substr(1)}\n\`\`\``)
                        .setColor('GREY');

                    pages.push(embed);
                });
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Evaluated in ${Math.round(Date.now() - old)}ms`)
                    .addField("[INPUT]", `\`\`\`ts\n${code}\n\`\`\``)
                    .setDescription("**[OUTPUT]**" + `\n\`\`\`ts\n${evaled}\n\`\`\``)
                    .addField('[TYPE]', `\`\`\`xl\n${(dataType).substr(0, 1).toUpperCase() + dataType.substr(1)}\n\`\`\``)
                    .setColor('GREY');

                pages.push(embed);
            };

            paginate(message, pages);
        } catch (err) {
            message.channel.send({ embeds: [new MessageEmbed().setDescription(`\`ERROR\` \`\`\`ts\n${clean(err)}\n\`\`\``).setColor('GREY')] });
        };

        async function paginate(message, pages) {

            if (!pages || !message) throw new TypeError(`Please supply both message and a pages array!`);
            let count = 0;
            let pos = 0;
            let dropdowns = [];

            await pages.forEach(() => {
                const newPos = pos++
                dropdowns.push({
                    label: `${pages[newPos].title}`,
                    description: `Click to go to page ${newPos + 1}`,
                    value: `${newPos}`
                });
            });

            const row1 = new MessageActionRow()
                .addComponents([
                    new MessageSelectMenu()
                        .setPlaceholder("Choose a page to go to.")
                        .addOptions(dropdowns)
                        .setCustomId("queue_pagination")
                ]);
            const row2 = new MessageActionRow()
                .addComponents([
                    new Discord.MessageButton()
                        .setCustomId('evalbtn')
                        .setLabel('Delete Output')
                        .setStyle('DANGER')
                ]);

            const baseMessage = await message.reply({
                embeds: [pages[count]], components: [row1, row2], allowedMentions: { repliedUser: false }
            });
            const collector = baseMessage.createMessageComponentCollector({ componentType: "SELECT_MENU", time: 45000 });

            collector.on("collect", async (interaction) => {
                if (interaction.isSelectMenu()) {
                    if (interaction.customId === "queue_pagination") {
                        if (interaction.user.id !== message.author.id) return;
                        const newPage = interaction.values[0];
                        interaction.update({ embeds: [pages[newPage]] });
                    };
                };
            });
        };

        function clean(text) {
            if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace(process.env.TOKEN, process.env.token);
            else return text;
        };
    },
};