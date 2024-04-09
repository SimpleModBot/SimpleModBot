import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("I say whatever you want...")
        .addStringOption(o => o
            .setName("text")
            .setDescription("the text")
            .setRequired(true))
    ,

    async exec(interaction: ChatInputCommandInteraction) {
        const str = interaction.options.getString("text");

        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setDescription(`${str as string}`)
                .setFooter({ text: interaction.user.globalName as string, iconURL: interaction.user.avatarURL() as string })
                .setTimestamp()
            ] });
    }
}