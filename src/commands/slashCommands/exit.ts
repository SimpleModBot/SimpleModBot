import { ChatInputCommandInteraction, SlashCommandBuilder, Client } from "discord.js";

//@ts-ignore
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("exit-app")
    .setDescription("eee"),

    devOnly: true,

    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        console.log(`Developer: ${chalk.orangeBright(`${interaction.user.username}${interaction.user.discriminator}`)} has stopped the bot.`);

        process.exit(5);
    }
}