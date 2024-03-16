import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import figlet, { Fonts } from "figlet";

export default {
    data: new SlashCommandBuilder()
        .setName("ascii")
        .setDescription("creates an ascii art of your text")
        .addStringOption(o => o
            .setName("text")
            .setDescription("the text")
            .setRequired(true)
        )
        .addStringOption(o => o
            .setName("font")
            .setDescription("the font to use. defaults to \"Standard\".")
            .setChoices(
                { name: "3D", value: "3-D" },
                { name: "3D ASCII", value: "3D-ASCII" },
                { name: "Big Money", value: "Big Money-ne" },
                { name: "Bloody", value: "Bloody" },
                { name: "5 Line Oblique", value: "5 Line Oblique" },
                { name: "AMC Razor", value: "AMC Razor" },
                { name: "AMC Slider", value: "AMC Slider" },
                { name: "AMC Tubes", value: "AMC Tubes" },
                { name: "ANSI Regular", value: "ANSI Regular" },
                { name: "ANSI Shadow", value: "ANSI Shadow" },
                { name: "Acrobatic", value: "Acrobatic" },
                { name: "Basic", value: "Basic" },
                { name: "Broadway KB", value: "Broadway KB" },
                { name: "Bulbhead", value: "Bulbhead" },
                { name: "Calvin S", value: "Calvin S" },
                { name: "Graffiti", value: "Graffiti" },
                { name: "Larry 3D", value: "Larry 3D" },
                { name: "Mini", value: "Mini" },
                { name: "Puffy", value: "Puffy" },
                { name: "Slant", value: "Slant" },
                { name: "Train", value: "Train" },
            )
            /*
            ok so after asking a lot of people, potential options are below:
            3D-Diagonal - No, almost 2k characters from "Hello, world!"
            3D-ASCII - Yes (until it becomes a problem)
            All Big Moneys - Yes
            Binary - Yes
            Bloody - Yes
            5 Line Oblique - Yes
            AMC AAA01 - No, almost 2k chars
            AMC Neko - Yes (until it becomes a problem)
            AMC Razor - Yes
            AMC Slider - Yes
            AMC Tubes - Yes
            ANSI Regular - Yes
            ANSI Shadow - Yes
            Acrobatic - Yes (until it becomes a problem)
            Basic - Yes
            Broadway KB - Yes
            Bulbhead - Yes
            Calvin S - Yes
            Doh - No
            Dr Pepper - Yes
            Graffiti - Yes
            Larry 3D - Yes
            Mini - Yes
            Puffy - Yes
            Slant - Yes
            Standard - Yes
            Train - Yes
            If needed, will be able to write to a file.
            */
        ),

    async exec(interaction: ChatInputCommandInteraction) {
        const text: string = interaction.options.getString("text") as string;
        const font: Fonts = interaction.options.getString("font") as Fonts ?? "Standard" as Fonts;

        // I think that it would be a good idea to check if it's over 2k characters long, yes?
        const txt: string = figlet.textSync(text, { font: font });

        if(txt.length > 2000) {
            interaction.reply({ content: "The message is too long. try again with a shorter message!" });
        } else {
            interaction.reply({ content: `\`\`\`${txt}\`\`\`` }); 
        } // weee

        
    }
}