import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import OwO from "../utils/owoifyFunc";

export default {
    data: new SlashCommandBuilder()
        .setName("owoify")
        .setDescription("Makes your text silly :3")
        .addStringOption(o => o
            .setName("text")
            .setDescription("text to owoify")
            .setRequired(true)),
    
    exec(interaction: ChatInputCommandInteraction) {
        const getString = interaction.options.getString("text");

        interaction.reply({
            ephemeral: false,
            embeds: [new EmbedBuilder()
                        .setTitle(OwO.translate("Here\'s your translated text :3"))
                        .setDescription(`\`${OwO.translate(getString as string)}\``)
                        .setTimestamp()
                    ]
        })
    }
}