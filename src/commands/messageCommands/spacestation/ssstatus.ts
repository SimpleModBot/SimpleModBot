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
	name: 'ssstatus',
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

		server = `http://${server}/status`;

		try {
			fetch(server)
				.then((res) => res.json())
				.then((body) => {
					let { name, players, tags, soft_max_players, run_level, round_start_time } = body;

					const embed = new Discord.MessageEmbed()
						.setTitle(`${name}   -   Status Information`)
						.setURL(server)
						.addField('Players', `${players}/${soft_max_players}`)
						.addField('Start time', `${round_start_time?.replace('T', ' ').split('.')[0] || 'In Lobby'}`)
						.setColor('GREY');

					message.channel.send({ embeds: [embed] });
				});
		} catch (error) {
			return message.channel.send({ content: `Something went wrong, try again later.` });
		}
	},
};
