import { ChatInputCommandInteraction } from "discord.js";
import config from "../../settings.json"

export default {
    name: "interactionCreate",

    async execute(interaction: ChatInputCommandInteraction) {
        //@ts-ignore
        const command = interaction.client.commands.get(interaction.commandName);

        if (!interaction.isChatInputCommand()) return;
        else if (!command) return interaction.followUp("There was an issue whilst running this command");

        await command.execute(interaction);
    }
}