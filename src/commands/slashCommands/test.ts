import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("test").setDescription("ignore this command lol"),
    devOnly: true,

    async execute(interaction: ChatInputCommandInteraction) {
        return interaction.reply("hello this is a test");
    }
}