"use strict"
//@ts-check

import { REST, Routes } from "discord.js";
//@ts-ignore
import config from "../../settings.json" assert { type: "json" };

const chalk = import("chalk");

const WORKING_DIR = process.cwd();

export default async function deploySlashCommands(s_commands: string[]) {
    console.log((await chalk).yellowBright("Registering commands"));

    const s_commands_deploy: any = [];

    for (const file of s_commands) {
        const command = require(`${WORKING_DIR}/out/src/commands/slashCommands/${file}`);

        s_commands_deploy.push(command.data.toJSON());

        console.log(`${(await chalk).greenBright("Successfully loaded =>\t")}${(await chalk).blueBright(file)}`);
    }

    const rest = new REST({ version: "10" }).setToken(config.Discord.token);

    console.log((await chalk).yellowBright("Actually registering commands now"));

    try {
        const data = await rest.put(Routes.applicationCommands(config.Discord.app_id), { body: s_commands_deploy });
    } catch (err) {
        console.error((await chalk).redBright("There has been an error while registering commands!\n%s"), err);
    }
}