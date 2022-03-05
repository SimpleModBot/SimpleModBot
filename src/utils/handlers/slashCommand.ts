const { glob } = require('glob');
const { promisify } = require('util');
const { Client } = require('discord.js');
const globPromise = promisify(glob);
const chalk = require('chalk');

module.exports = async (client) => {
	const slashCommands = await globPromise(`${process.cwd()}/commands/slashCommands/*/*.ts`);
	const arrayOfSlashCommands = [];

	try {
		slashCommands.map((value) => {
			const file = require(value);
			if (!file?.name) return;
			client.slashCommands.set(file.name, file);

			if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
			console.log(chalk.blue(`[SCMD]`) + ` ${file.name} ` + chalk.green(`- ${file.description || 'No description'}`));
			arrayOfSlashCommands.push(file);
		});
	} catch (error) {
		console.error(error);
	}

	client.commandArray = arrayOfSlashCommands;
};
