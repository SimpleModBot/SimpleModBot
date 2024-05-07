// @ts-ignore
const Discord = require('discord.js');
// @ts-ignore
const fetch = require('node-fetch');
// @ts-ignore
const servers = [
	['parkstation', 'parkstation.simplestation.org'],
	['simplestation', 'simplestation.simplestation.org'],
];

module.exports = {
	name: 'sscombo',
	description: "Get information on a Space Station 14 server\n> First argument decides what server to get information on, can be a direct ip:port.\n> Available server aliases: 'parkstation', 'simplestation'",
	cooldown: 15,
	async execute(message, args, data, client) {
		let server = 'parkstation.simplestation.org';
		const oldserver = server;
		if (args[0] !== 'ENA') {
			servers.forEach((srv) => {
				if (srv[0] == args[0] && srv[1] !== server) {
					return (server = srv[1]);
				}
			});
		}
		if (args[0] !== 'ENA' && args[0].includes('.') && oldserver == server) {
			server = args[0];
		}

		server = `https://${server}`;

		let status = undefined;
		let info = undefined;

		try {
			await fetch(`${server}/status`)
				.then((res) => res.json())
				.then((body) => {
					status = body;
				});
			await fetch(`${server}/info`)
				.then((res) => res.json())
				.then((body) => {
					info = body;
				});

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
		} catch (error) {
			message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Something went wrong, try again later.`).setColor('GREY')] });
		}
	},
};
