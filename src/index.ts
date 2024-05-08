/*-------------------------------------------------------------------------------REQUIREMENTS-------------------------------------------------------------------------------*/

// @ts-ignore
// const Discord = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: 1003 });
const discordModals = require('discord-modals');
discordModals(client);
// @ts-ignore
const figlet = require('figlet');
// @ts-ignore
const chalk = require('chalk');
const fs = require('fs');
// @ts-ignore
const rgb = require('lolcatjs');
const { DiscordTogether } = require('discord-together');
require('dotenv').config();

client.prefix = '\\';
client.ownerID = '801294818839756811';
client.devIDs = ['801294818839756811', '398758748904226836'];
client.lastCmd = undefined;

client.data = require('./database/mongoose.ts');
client.messageCommands = new Discord.Collection();
client.slashCommands = new Discord.Collection();

client.cooldowns = new Discord.Collection();
client.snipes = new Discord.Collection();
client.editsnipes = new Discord.Collection();

client.discordTogether = new DiscordTogether(client);

/*---------------------------------------------------------------------------------HANDLING---------------------------------------------------------------------------------*/

async function login() {
	client.startTime = Date.now();

	const handlers = await fs.readdirSync('./utils/handlers').filter((file) => file.endsWith('.ts'));
	const eventFiles = await fs.readdirSync('./events').filter((file) => file.endsWith('.ts'));
	const messageCommandFolders = await fs.readdirSync('./commands/messageCommands');

	/*-----------------------------------------------------------------------------------LOGIN-----------------------------------------------------------------------------------*/

	for (File of handlers) require(`./utils/handlers/${File}`)(client);

	require('events').EventEmitter.defaultMaxListeners = 0;
	process.setMaxListeners(0);
	client.setMaxListeners(0);

	client.handleEvents(eventFiles, './events');
	client.handleMessageCommands(messageCommandFolders, './commands/messageCommands');
	await client.login(process.env.TOKEN);
}

login();

/*---------------------------------------------------------------------------------ANTICRASH---------------------------------------------------------------------------------*/

process.on('unhandledRejection', async (error) => {
	const { MessageActionRow, MessageSelectMenu } = require('discord.js');
	// @ts-ignore
	const err = error.stack.split('\n');
	const row = new MessageActionRow().addComponents([new Discord.MessageButton().setCustomId('delerr').setLabel('Delete error').setStyle('DANGER'), new Discord.MessageButton().setCustomId('fullerr').setLabel('Show full error').setStyle('PRIMARY')]);

	await client.channels.cache
		.get('915829733311266817')
		.send({
			embeds: [new Discord.MessageEmbed().setTitle(`unhandledRejection`).setDescription(`\`\`\`diff\n+ Presumable cause: \`${client.lastCmd}\`\n- ${err[0]}\n+ ${err[1]}\n\`\`\``).setTimestamp().setColor('GREY')],
			components: [row],
		})
		.then((m) => {
			m.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 }).on('collect', async (i) => {
				if (i.isButton()) {
					if (i.customId === 'delerr') {
						await m.delete();
					} else if (i.customId == 'fullerr') {
						await m.edit({
							embeds: [
								new Discord.MessageEmbed()
									.setTitle(`unhandledRejection`)
									.setDescription(
										`\`\`\`diff\n+ Presumable cause: \`${client.lastCmd}\`\n- ${err[0]}\n+ ${err[1]}\n+ ${err[2]}\n+ ${err[3]}\n+ ${err[4]}\n+ ${err[5]}\n+ ${err[6]}\n+ ${err[7]}\n+ ${err[8]}\n+ ${err[9]}\n+ ${err[10]}\n+ ${err[11]}\n+ ${err[12]}\n+ ${err[13]}\n+ ${err[14]}\n+ ${err[15]}\`\`\``,
									)
									.setTimestamp()
									.setColor('GREY'),
							],
						});
					}
				}
			});
		});
});

process.on('uncaughtException', async (error) => {
	const { MessageActionRow, MessageSelectMenu } = require('discord.js');
	// @ts-ignore
	const err = error.stack.split('\n');
	const row = new MessageActionRow().addComponents([new Discord.MessageButton().setCustomId('delerr').setLabel('Delete error').setStyle('DANGER'), new Discord.MessageButton().setCustomId('fullerr').setLabel('Show full error').setStyle('PRIMARY')]);

	await client.channels.cache
		.get('915829733311266817')
		.send({
			embeds: [new Discord.MessageEmbed().setTitle(`uncaughtException`).setDescription(`\`\`\`diff\n+ Presumable cause: \`${client.lastCmd}\`\n- ${err[0]}\n+ ${err[1]}\n\`\`\``).setTimestamp().setColor('GREY')],
			components: [row],
		})
		.then((m) => {
			m.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 }).on('collect', async (i) => {
				if (i.isButton()) {
					if (i.customId === 'delerr') {
						await m.delete();
					} else if (i.customId == 'fullerr') {
						await m.edit({
							embeds: [
								new Discord.MessageEmbed()
									.setTitle(`uncaughtException`)
									.setDescription(
										`\`\`\`diff\n+ Presumable cause: \`${client.lastCmd}\`\n- ${err.join('\n- ')}\`\`\``,
									)
									.setTimestamp()
									.setColor('GREY'),
							],
						});
					}
				}
			});
		});
});

process.on('warning', async (info) => {
	await client.channels.cache.get('915829733311266817').send({
		embeds: [new Discord.MessageEmbed().setTitle(`warning`).setDescription(`\`\`\`diff\n+ Presumable cause: \`${client.lastCmd}\`\n+ ${info}\n\`\`\``).setTimestamp().setColor('GREY')],
	});
});

process.on('beforeExit', async () => {
	console.log(figlet(chalk.redBright('Shutting down...')));
	await client.destroy();
});

process.on('exit', async () => {
	console.log(figlet(chalk.redBright('Shut down.')));
});

/*---------------------------------------------------------------------------------FUNCTIONS---------------------------------------------------------------------------------*/

async function paginate(message, pages) {
	const { MessageActionRow, MessageSelectMenu } = require('discord.js');

	if (!pages || !message) throw new TypeError(`Please supply both message and a pages array!`);
	let count = 0;
	let pos = 0;
	let dropdowns = [];

	pages.forEach(() => {
		const newPos = pos++;
		dropdowns.push({
			// @ts-ignore
			label: `${pages[newPos].title}`,
			// @ts-ignore
			description: `Click to go to page ${newPos + 1}`,
			// @ts-ignore
			value: `${newPos}`,
		});
	});

	const row = new MessageActionRow().addComponents([new MessageSelectMenu().setPlaceholder('Choose a page to go to.').addOptions(dropdowns).setCustomId('queue_pagination')]);

	const baseMessage = await message.reply({ embeds: [pages[count]], components: [row], allowedMentions: { repliedUser: false } });
	const collector = baseMessage.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 60000 });

	collector.on('collect', async (interaction) => {
		if (interaction.isSelectMenu()) {
			if (interaction.customId === 'queue_pagination') {
				if (interaction.user.id !== message.author.id) return;
				const newPage = interaction.values[0];
				await interaction.update({ embeds: [pages[newPage]] });
			}
		}
	});
}

async function spaginate(interaction, pages) {
	const { MessageActionRow, MessageSelectMenu } = require('discord.js');

	if (!pages || !interaction) throw new TypeError(`Please supply both interaction and a pages array!`);
	let count = 0;
	let pos = 0;
	let dropdowns = [];

	pages.forEach(() => {
		const newPos = pos++;
		dropdowns.push({
			// @ts-ignore
			label: `${pages[newPos].title}`,
			// @ts-ignore
			description: `Click to go to page ${newPos + 1}`,
			// @ts-ignore
			value: `${newPos}`,
		});
	});

	const row = new MessageActionRow().addComponents([new MessageSelectMenu().setPlaceholder('Choose a page to go to.').addOptions(dropdowns).setCustomId('queue_pagination')]);

	const baseMessage = await interaction.channel.send({ embeds: [pages[count]], components: [row] });
	interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Sent pagination embed.`).setColor('GREY')], ephemeral: true });
	const collector = baseMessage.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 60000 });

	collector.on('collect', async (i) => {
		if (i.isSelectMenu()) {
			if (i.customId === 'queue_pagination') {
				if (i.user.id !== interaction.member.id) return;
				const newPage = i.values[0];
				await i.update({ embeds: [pages[newPage]] });
			}
		}
	});
}

function inspec(code) {
	let evaled = eval(code);
	let rawEvaled = evaled;
	if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 0 });

	let dataType = Array.isArray(rawEvaled) ? 'Array<' : typeof rawEvaled,
		dataTypes = [];
	if (~dataType.indexOf('<')) {
		rawEvaled.forEach((d) => {
			// @ts-ignore
			if (~dataTypes.indexOf(Array.isArray(d) ? 'Array' : typeof d)) return;
			// @ts-ignore
			dataTypes.push(Array.isArray(d) ? 'Array' : typeof d);
		});
		// @ts-ignore
		dataType += dataTypes.map((s) => s[0].toUpperCase() + s.slice(1)).join(', ') + '>';
	}

	return {
		evaled: evaled,
		rawEvaled: rawEvaled,
		dataType: dataType,
	};
}

async function sleep(ms) {
	await new Promise((resolve) => setTimeout(resolve, ms));
}

async function getUptime() {
	const schema = require('./database/models/readyatSchema.ts');
	let ready = await schema.findOne({ timezone: 'PST/Pacific Standard Time' });
	let time = Date.now() - ready.time;
	let Days = Math.floor(time / 86400000);
	let Hours = Math.floor(time / 3600000) % 24;
	let Minutes = Math.floor(time / 60000) % 60;
	let Seconds = Math.floor(time / 1000) % 60;
	function RemoveUseless(Duration) {
		return Duration.replace('`0` Day', '').replace('`0` Hour', '').replace('`0` Minute', '');
	}
	return RemoveUseless(`\`${Days}\` ${Days > 1 ? 'Days' : 'Day'} \`${Hours}\` ${Hours > 1 ? 'Hours' : 'Hour'} \`${Minutes}\` ${Minutes > 1 ? 'Minutes' : 'Minute'} \`${Seconds}\` ${Seconds > 1 ? 'Seconds' : 'Second'}`);
}

function splitLength(string, length) {
	const size = Math.ceil(string.length / length);
	const r = Array(size);
	let offset = 0;

	for (let i = 0; i < size; i++) {
		r[i] = string.substr(offset, length);
		offset += length;
	}

	return r;
}

const functions = {
	paginate: paginate,
	spaginate: spaginate,
	inspect: inspec,
	sleep: sleep,
	getUptime: getUptime,
	splitLength: splitLength,
};

client.functions = functions;
