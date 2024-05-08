// @ts-ignore
const Discord = require('discord.js');
// @ts-ignore
const fetch = require('node-fetch');
// @ts-ignore
const argsToServer = require('../../../utils/handlers/ssArgsToServer.ts');
// @ts-ignore
const servers = require("../../../utils/json/servers.json");


module.exports = {
	name: 'ssstatus',
	description: `Get information on a Space Station 14 server\n> First argument decides what server to get information on, can be a direct http(s)://ip:port.\n> Available server aliases: ${servers.map((srv) => `\`${srv[0]}\``).join(', ')}`,
	cooldown: 15,
	async execute(message, args, data, client) {
		let server = argsToServer(args);

		fetch(`${server}/status`)
			.then((res) => res.json())
			.then((body) => {
				let { name, players, tags, soft_max_players, run_level, round_start_time } = body;

				const embed = new Discord.MessageEmbed()
					.setTitle(`${name}   -   Status Information`)
					.setURL(`${server}/status`)
					.addField('Players', `${players}/${soft_max_players}`)
					.addField('Start time', `${round_start_time?.replace('T', ' ').split('.')[0] || 'In Lobby'}`)
					.setColor('GREY');

				message.channel.send({ embeds: [embed] });
			}).catch((err) => {
				return message.channel.send({ content: `Error:\n> ${err.message}` });
			});
	},
};
