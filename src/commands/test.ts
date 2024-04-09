import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("simply a test!")
    ,

    async exec(interaction: ChatInputCommandInteraction) {
        interaction.reply({ content: "This is literally a test...", ephemeral: true });
    }
}