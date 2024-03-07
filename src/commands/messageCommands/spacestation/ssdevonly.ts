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
	name: 'ssdevonly',
	aliases: ['ssdev'],
	devOnly: true,
	description: '',
	async execute(message, args, data, client) {
		let server = 'parkstation.simplestation.org';
		let oldserver = server;
		let path = '';

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
		if (args[1]) path = args[1];
		else return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`You need to specify a path.`).setColor('GREY')] });

		try {
			fetch(`${server}/${path}`, { method: 'POST', headers: { WatchdogToken: process.env.WATCHDOG_TOKEN } })
				.then((res) => res.json())
				.then((body) => {
					message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Sent the \`${path}\` request to \`${server}\`.`).setColor('GREY')] });
				});
		} catch (err) {
			return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Something went wrong, try again later or fix the URL if any.`).setColor('GREY')] });
		}
	},
};
