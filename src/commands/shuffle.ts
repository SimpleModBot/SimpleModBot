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
        const originalStringArray: Array<string> = interaction.options.getString("text")!.split(" ");
        let arrayCopy: Array<string> = originalStringArray;
        let randomIndex: number = 0, indexes: number = originalStringArray.length;
        let holder: string;

        while(indexes) {
            randomIndex = Math.random() * indexes-- | 0; // give value -> subtract. rather than subtract -> give value
            holder = arrayCopy[indexes];
            arrayCopy[indexes] = arrayCopy[randomIndex];
            arrayCopy[randomIndex] = holder;
        }

        interaction.reply({ embeds: [new EmbedBuilder().setDescription(arrayCopy.join(" "))] });
    } // will optimize later >m<
}