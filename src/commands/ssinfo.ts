import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import get from "../utils/httpGet";
import checkJSON from "../utils/checkJSON";

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
        let linksStr: string = "";

        await interaction.deferReply();

        // time for the messy code
        const infoP1: string  = await get(`http://${server}/info`); // get the guys
        const infoP2: string  = await get(`http://${server}/status`);

        // now check if the link works...
        if((checkJSON(infoP1) || checkJSON(infoP2)) === false) {
            interaction.editReply({ content: "Double-check the link you gave, the data I recieved wasn\'t expected." });
        } else {
            // then turn the data into JSON and give the final data :) (hopefully)
            const iP1JSON = JSON.parse(infoP1); // /info
            const iP2JSON = JSON.parse(infoP2); // /status

            iP1JSON.links.forEach(link => { linksStr += `[${link.name}](${link.url})\t` });

            // https://docs.spacestation14.com/en/robust-toolbox/server-http-api.html is my bestie
            interaction.editReply({ embeds: [new EmbedBuilder()
                .setTitle(`${iP2JSON.name}`)
                .setDescription(iP1JSON.desc)
                .addFields(
                    { name: "tags", value: `\`${iP2JSON.tags.join(", ")}\`` },
                    { name: "panic bunker enabled?", value: `\`${iP2JSON.panic_bunker == undefined || null || false ? "no" : "yes"}\``, inline: true },
                    { name: "links", value: linksStr }
                )
                .setTimestamp()] })
        }

        
    }
}