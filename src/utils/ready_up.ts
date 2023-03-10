"use strict"
//@ts-check

import { Client, REST, Routes } from "discord.js";
//@ts-ignore
import config from "../../settings.json" assert { type: "json" };

//@ts-ignore
const chalk = require("chalk");

const WORKING_DIR = process.cwd();

export default async function deploySlashCommands(s_commands: string[], client: Client) {
    console.log(chalk.yellowBright("Registering commands"));

    const s_commands_deploy: any = [];

    for (const file of s_commands) {
        const command = require(`${WORKING_DIR}/out/src/commands/slashCommands/${file}`);

        s_commands_deploy.push(command.data.toJSON());

        console.log(`${chalk.greenBright("Successfully loaded =>\t")}${chalk.blueBright(file)}`);
    }

    const rest = new REST({ version: "10" }).setToken(config.Discord.token);

    console.log(chalk.yellowBright("Actually registering commands now"));

    try {
        const data = await rest.put(Routes.applicationCommands(config.Discord.app_id), { body: s_commands_deploy });

        console.log(chalk.greenBright("Successfully registered commands."));
    } catch (err) {
        console.error(chalk.redBright("There has been an error while registering commands:\n"), err);
        process.exit(1);
    }

    console.log(chalk.yellowBright("Logging in"));

    await client.login(config.Discord.token);

    //@ts-expect-error
    console.log(`${chalk.greenBright("Successfully logged in!\n")}Application id: ${chalk.blueBright(client.user.id)}\nBot token: ${chalk.blueBright(config.Discord.token)}\nClient name: ${chalk.blueBright(`${client.user.username}${client.user.discriminator}`)}`);
}