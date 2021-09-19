const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval",
    aliases: ['e'],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        let NValidEVAL = new MessageEmbed()
            .addField("Executor", `<@${message.author.id}>`)
            .addField("Command Output", `\`\`\`diff\nError: Invalid Usage\`\`\``)
            .addField("Usage:", `\`\`\`diff\n ${client.prefix}eval <code>\`\`\``)
            .setAuthor("Invalid Usage.")
            .setColor("#ff0000");

        if (args[0] == "ENA") return message.channel.send({ embeds: [NValidEVAL] });

        function clean(text) {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        };

        try {
            let code = args.join(" ");

            let evaled = await eval(code);
            let rawEvaled = evaled;
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled, {
                    "depth": 0
                });

            let dataType = Array.isArray(rawEvaled) ? "Array<" : typeof rawEvaled, dataTypes = [];
            if (~dataType.indexOf("<")) {
                rawEvaled.forEach(d => {
                    if (~dataTypes.indexOf(Array.isArray(d) ? "Array" : typeof d)) return;
                    dataTypes.push(Array.isArray(d) ? "Array" : typeof d);
                });
                dataType += dataTypes.map(s => s[0].toUpperCase() + s.slice(1)).join(", ") + ">";
            };

            let EvalResult = new MessageEmbed()
                .setTitle(`Evaluated in ${Math.round(Date.now() - message.createdTimestamp)}ms`)
                .addField("[INPUT]", `\`\`\`ts\n${code}\n\`\`\``)
                .addField("[OUTPUT1]", `\`\`\`ts\n${clean(evaled).slice(0, 1000)}\n\`\`\``)
                .addField('[TYPE]', `\`\`\`xl\n${(dataType).substr(0, 1).toUpperCase() + dataType.substr(1)}\n\`\`\``)
                .setColor('GREEN');

            let position = 0;
            let pages = [EvalResult];

            if (clean(evaled).length > 1000) {
                const EvalResult2 = new MessageEmbed()
                    .setTitle(`Evaluated in ${Math.round(Date.now() - message.createdTimestamp)}ms`)
                    .addField("[OUTPUT2]", `\`\`\`ts\n${clean(evaled).slice(1000, 2000)}\n\`\`\``)
                    .addField('[TYPE]', `\`\`\`xl\n${(dataType).substr(0, 1).toUpperCase() + dataType.substr(1)}\n\`\`\``)
                    .setColor('GREEN');

                pages = [EvalResult, EvalResult2];

                if (clean(evaled).length > 2000) {
                    const EvalResult3 = new MessageEmbed()
                        .setTitle(`Evaluated in ${Math.round(Date.now() - message.createdTimestamp)}ms`)
                        .addField("[OUTPUT3]", `\`\`\`ts\n${clean(evaled).slice(2000, 3000)}\n\`\`\``)
                        .addField('[TYPE]', `\`\`\`xl\n${(dataType).substr(0, 1).toUpperCase() + dataType.substr(1)}\n\`\`\``)
                        .setColor('GREEN');

                    pages = [EvalResult, EvalResult2, EvalResult3];
                };
            };

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
            const pagination = await message.channel.send({
                embeds: [pages[position]],
                components: [paginationbuttons]
            });

            const collector = pagination.componentCollector(
                {
                    componentType: "BUTTON",
                    time: 60000
                });

            collector.on("collect", async (button) => {
                if (button.user.id === message.author.id) {
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
        } catch (err) {
            message.channel.send({ embeds: [new MessageEmbed().setDescription(`\`ERROR\` \`\`\`ts\n${clean(err)}\n\`\`\``).setColor('GREY')] });
        };
    },
};