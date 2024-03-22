import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import emojifyString from "../utils/emojifyFunc";

export default {
    data: new SlashCommandBuilder()
        .setName("emojify")
        .setDescription("Paints a message in beautiful emoji art.")
        .addStringOption(o => o
            .setName("text")
            .setDescription("The text to recreate.")
            .setRequired(true)
        ),

    async exec(interaction: ChatInputCommandInteraction) {
        const text: string = interaction.options.getString("text") as string;
        
        await interaction.reply(emojifyString(text));
    }
}