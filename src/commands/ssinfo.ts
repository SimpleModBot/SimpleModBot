import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import get from "../utils/httpGet";
import { createImmediatelyInvokedFunctionExpression } from "typescript";

export default {
    data: new SlashCommandBuilder()
        .setName("ssinfo")
        .setDescription("Get info on a SS14 server")
        .addStringOption(o => o
            .setName("server")
            .setDescription("the server ip (or domain name)")
            .setRequired(true)),
        
    async exec(interaction: ChatInputCommandInteraction) {
        const server = interaction.options.getString("server");

        // time for the messy code
        const infoP1: string = await get(`http://${server}/info`); // get the guys
        const infoP2: string = await get(`http://${server}/status`);

        // now check if the link works...
        if(/<\/?[a-z][\s\S]*>/i.test(infoP1)) {
            interaction.reply({ content: "Double-check the link you gave. Got HTML instead of JSON", ephemeral: true });
        } else {
            // then turn the data into JSON and give the final data :) (hopefully)
            const iP1JSON = JSON.parse(infoP1); // /info
            const iP2JSON = JSON.parse(infoP2); // /status

            // https://docs.spacestation14.com/en/robust-toolbox/server-http-api.html is my bestie
            interaction.reply({ embeds: [new EmbedBuilder()
                .setTitle(`${iP2JSON.name}`)
                .setDescription(iP1JSON.desc)
                .addFields(
                    { name: "tags", value: `\`${iP2JSON.tags.join(", ")}\``, inline: true }
                )
                .setTimestamp()] })
        }

        
    }
}