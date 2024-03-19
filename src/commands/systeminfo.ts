import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import os from "os";
import getCPUInfo from "../utils/getCPUInfo";

export default {
    data: new SlashCommandBuilder()
        .setName("systeminfo")
        .setDescription("information about the system that the bot is hosted on")
    ,

    async exec(interaction: ChatInputCommandInteraction) {
        interaction.reply({ embeds: [new EmbedBuilder()
            .setTitle("System Info")
            .setDescription(`\`\`\`yaml\nOS:\t${os.platform}\nCPU:\t${getCPUInfo().model}\nCores:\t${getCPUInfo().coreCount}\nCPU Usage:\t${getCPUInfo().avgCPULoad}%\nTotal RAM:\t${Math.trunc(Math.round((os.totalmem() * 1E-6)))} Mb\nRAM Usage:\t${Math.trunc(Math.round((os.totalmem()-os.freemem())) * 1E-6)} Mb\`\`\``)
            .setTimestamp()
        ]}); // will try something with os info later :3
    }
}