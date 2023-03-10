import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("ignore this command lol"),

    devOnly: false,

    async execute(interaction: ChatInputCommandInteraction) {
        return interaction.reply("hello this is a test");
    }
}