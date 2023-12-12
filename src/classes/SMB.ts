import { ApplicationCommandDataResolvable, Client, Collection, REST, Events, Interaction, ChatInputCommandInteraction, Routes } from "discord.js";
import { SETUP } from "../../config.json";
import Command from "./Command";
import { readdirSync } from "fs";
import { join } from "path";
import { TERMINAL_COLOURS } from "../utils/const";


export default class SMB {
    public slashCommands = new Array<ApplicationCommandDataResolvable>;
    public slashCommandsM = new Collection<string, Command>;

    public constructor(public readonly client: Client) {
        console.log("registering slash commands...");
        this.registerSlashCommands();

        this.client.login(SETUP.Discord.token);

        this.client.on("ready", () => {
            console.log("ready! UwU");
        });

        this.onInteractionCreate();
    }

    private async registerSlashCommands() {
        const rest = new REST({ version: "9" }).setToken(SETUP.Discord.token);

        const commandFiles = readdirSync(join(__dirname, "..", "commands")).filter((file) => !file.endsWith(".map"));

        for (const file of commandFiles) {
            const command = await import(join(__dirname, "..", "commands", `${file}`));

            this.slashCommands.push(command.default.data);
            this.slashCommandsM.set(command.default.data.name, command.default);

            console.log(`${TERMINAL_COLOURS.INFO}Loaded => ${TERMINAL_COLOURS.SUCCESS}${command.default.name}${TERMINAL_COLOURS.DEFAULT}`);
        }

        await rest.put(Routes.applicationCommands(SETUP.Discord.app_id), { body: this.slashCommands });
    }

    private async onInteractionCreate() {
        this.client.on(Events.InteractionCreate, async (interaction: Interaction): Promise<any> => {
            if(!interaction.isChatInputCommand()) return;

            const command = this.slashCommandsM.get(interaction.commandName);

            if(!command) return;

            try {
                command.exec(interaction as ChatInputCommandInteraction);
            } catch(err: any) {
                console.error(err);
            }
        });
    }
}