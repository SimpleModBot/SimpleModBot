import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("shuffles the words in your sentence around")
    .addStringOption(o => o
        .setName("text")
        .setDescription("the text to shuffle around")
        .setRequired(true)),

    exec(interaction: ChatInputCommandInteraction) {
        const stringToShuffle = interaction.options.getString("text");

        
    }
}