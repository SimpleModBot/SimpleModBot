// @ts-ignore
const Discord = require('discord.js');
const mongis = require('../database/mongoose.ts');
const schema = require('../database/models/ccSchema.ts');
// @ts-ignore
const mongoose = require('mongoose');

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		await mongis.init();
		client.emit('antiInviteMessageCreate', message, client);

		if (message.channel.type == 'DM') return;
		if (message.author.bot) return;

		client.prefix = '\\';
		client.prefixes = [];

		// let balanceDB = client.data.getBalanceDB(message.author.id);
		// let blacklistDB = client.data.getBlacklistDB(message.author.id);
		// let guildDB = client.data.getGuildDB(message.guild.id);
		// let inventoryDB = client.data.getInventoryDB(message.author.id);
		// let timeDB = client.data.getReadyatDB();
		const [balanceDB, blacklistDB, guildDB, inventoryDB, timeDB] = await Promise.all([
			await client.data.getBalanceDB(message.author.id),
			await client.data.getBlacklistDB(message.author.id),
			await client.data.getGuildDB(message.guild.id),
			await client.data.getInventoryDB(message.author.id),
			await client.data.getReadyatDB(),
		]);

		let data = {
			config: {},
			balance: {},
			blacklisted: {},
			guild: {},
			inventory: {},
			time: {},
		};

		data.config = client;
		data.balance = balanceDB;
		data.blacklisted = blacklistDB;
		data.guild = guildDB;
		data.inventory = inventoryDB;
		data.time = timeDB;

		if (guildDB.prefixes) {
			guildDB.prefixes.forEach((prefix) => {
				client.prefixes.push(prefix);
			});
		}

		let prefixes = client.prefixes.join('|') + '|';
		if (prefixes.length < 2) prefixes = '';

		const prefixRegex = new RegExp(`^((hey|heya|hello|hi|oi) (smb|there smb|simplemodbot|there simplemodbot)( (can|could) (you|ya))?( maybe| possibly| please)?)|^((${prefixes}<@\!\?911112976793215006>|smb|simplemodbot|\\\\)) *`, `i`);
		if (!prefixRegex.test(message.content)) return;
		if (message.content == `<@!${client.user.id}>`)
			return message.channel.send({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle('It appears you mentioned me!')
						.setDescription(
							`Hello! I am SimpleModBot! An easy to use multipurpose bot.\n\nIf you wish to know my prefix, I have many, but the common ones are \`\\\` and mentioning me\nIf you have permission to manage guild then you cna change my prefixes\n\nIf you wish to know my commands type \`${client.prefix}help\`.`,
						)
						.setFooter({ text: 'Please invite me to your servers to help me grow!\nTheres a button on my profile ^-^' })
						.setImage('https://cdn.discordapp.com/attachments/885009693645344829/891421005082398750/simplemodbot.gif')
						.setTimestamp()
						.setColor('GREY'),
				],
			});

		const matchedPrefix = message.content.replace(prefixRegex, '').trim();
		let args = matchedPrefix.split(' ');
		if (!args[1]) args[1] = 'ENA';
		args = args.filter((e) => e);
		let commandName = args.shift().toLowerCase();

		const dataa = await schema.findOne({ Guild: message.guild.id, Command: commandName });
		if (dataa)
			return message.channel.send({
				embeds: [
					new Discord.MessageEmbed()
						.setDescription(dataa.Response)
						.setFooter({ text: `CustomCommand: ${dataa.Command}` })
						.setColor('GREY')
						.setTimestamp(),
				],
			});

		let command = client.messageCommands.get(commandName) || client.messageCommands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;

		let profile = await require('../database/models/blackListSchema.ts').findOne({
			userID: message.author.id,
		});

		if (profile)
			return message.author.send({
				embeds: [new Discord.MessageEmbed().setDescription('You cannot use this bot as you are banned for ' + profile.reason + '. You can appeal in the support server: https://discord.gg/26NtPVvNCU').setColor('GREY')],
			});
		if (command.devOnly == true && !client.devIDs.includes(message.author.id))
			return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You don't have permission to use this command as it is only for developers.").setColor('GREY')] });
		const { cooldowns } = client;
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id) && message.author.id !== client.ownerID) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).setColor('GREY')] });
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		await client.channels.cache.get('915826612057030667').send({
			embeds: [
				new Discord.MessageEmbed()
					.setDescription(`${message.author}(${message.author.tag}) used \`${command.name} ${args.join(' ').replace('ENA', '')}\`.`)
					.setColor('GREY')
					.setTimestamp(),
			],
		});
		client.lastCmd = command.name;
		await command.execute(message, args, data, client);
	},
};
