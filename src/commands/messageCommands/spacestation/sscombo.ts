// @ts-ignore
const Discord = require('discord.js');
// @ts-ignore
const fetch = require('node-fetch');
// @ts-ignore
const argsToServer = require('../../../utils/handlers/ssArgsToServer.ts');
// @ts-ignore
const servers = require("../../../utils/json/servers.json");


module.exports = {
	name: 'sscombo',
	description: `Get information on a Space Station 14 server\n> First argument decides what server to get information on, can be a direct http(s)://ip:port.\n> Available server aliases: ${servers.map((srv) => `\`${srv[0]}\``).join(', ')}`,
	cooldown: 15,
	async execute(message, args, data, client) {
		let server = argsToServer(args);

		let status = undefined;
		let info = undefined;

		await fetch(`${server}/status`)
			.then((res) => res.json())
			.then((body) => { status = body; })
			.catch((err) => { return message.channel.send({ content: `Error:\n> ${err.message}` }); });
		await fetch(`${server}/info`)
			.then((res) => res.json())
			.then((body) => { info = body; })
			.catch((err) => { return message.channel.send({ content: `Error:\n> ${err.message}` }); });

		const embed = new Discord.MessageEmbed();

		if (status) {
			let { name, players, tags, soft_max_players, run_level, round_start_time } = status;

			// @ts-ignore
			embed.setTitle(`${name || server.split('//')[1].replace('//', '') || 'Error'}   -   Server Information`);
			embed.addField('Players', `${players}/${soft_max_players}`, true);
			// @ts-ignore
			embed.addField('Start time', `${round_start_time?.replace('T', ' ').split('.')[0] || 'In Lobby'}`, true);
			// @ts-ignore
			embed.addField('Tags', `${tags.toString() || 'No tags'}`, true);
			embed.setColor('GREY');
		}
		if (info) {
			let { connect_address, auth, build, desc, links } = info;

			embed.setURL(connect_address || server);
			embed.setDescription(desc || 'No description');

			// @ts-ignore
			links.forEach((link) => {
				embed.addField(`${link.name}`, `${link.url}`, true);
			});
		}

		if (status || info) message.channel.send({ embeds: [embed] });
		else message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Failed to contact server, try again later or fix given URL if any.`).setColor('GREY')] });
	},
};
