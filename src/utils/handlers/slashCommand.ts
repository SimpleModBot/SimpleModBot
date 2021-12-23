const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);

module.exports = async (client) => {
    const slashCommands = await globPromise(`${process.cwd()}/commands/slashCommands/*/*.ts`);
    const arrayOfSlashCommands = [];

    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });

    client.commandArray = arrayOfSlashCommands;
};