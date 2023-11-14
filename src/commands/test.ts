import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("test").setDescription("simply a test!"),

    exec(interaction: ChatInputCommandInteraction) {
        interaction.reply({
            content: "this is literally a test...",
            ephemeral: true
        });
    }
}