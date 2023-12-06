import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} from "discord.js";
import { readFileSync } from "fs";
import { join } from "path";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the ping of the bot"),

    exec(interaction: ChatInputCommandInteraction) {
        interaction.reply({
            ephemeral: false,
            embeds: [new EmbedBuilder()
                        .setTitle("🏓 Pong!")
                        .setDescription("Hmmm...")
                        .addFields(
                            { name: "Discord API:", value: `\`${interaction.client.ws.ping}\`` },
                            { name: "Uptime:", value: `\`${interaction.client.uptime}\`` }     
                        )
            ]
        })
    }
}