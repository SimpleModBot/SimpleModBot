import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { parseToTimeString } from "../utils/time";

export default {
    data: new SlashCommandBuilder()
        .setName("clientinfo")
        .setDescription("various information about the bot's client")
    ,

    async exec(interaction: ChatInputCommandInteraction) {
        interaction.reply({ embeds: [new EmbedBuilder()
            .setTitle("Client Info")
            .addFields(
                { name: "ID", value: `\`\`\`${interaction.client.user.id}\`\`\``},
                { name: "Uptime", value: `\`\`\`${parseToTimeString(interaction.client.uptime)}\`\`\``},
                { name: "Ping", value: `\`\`\`${interaction.client.ws.ping} ms\`\`\`` },
                { name: "Guild Count", value: `\`\`\`${interaction.client.guilds.cache.size}\`\`\``}
            )
            .setAuthor({ name: interaction .client.user.tag, iconURL: interaction.client.user.avatarURL() ?? undefined })
            .setTimestamp()
        ] })
    }
}