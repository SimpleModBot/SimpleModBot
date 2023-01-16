// @ts-ignore
const Discord = require('discord.js');
// @ts-ignore
const fetch = require('node-fetch');
// @ts-ignore
const servers = [
	['parkstation', '140.238.144.42:1212'],
	['simplestation', '140.238.144.42:1213'],
];

module.exports = {
	name: 'ssinfo',
	description: "Get information on a Space Station 14 server\n> First argument decides what server to get information on, can be a direct ip:port.\n> Available server aliases: 'parkstation', 'simplestation'",
	cooldown: 15,
	async execute(message, args, data, client) {
		let server = '140.238.144.42:1212';
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

		server = `http://${server}/info`;

		try {
			fetch(server)
				.then((res) => res.json())
				.then((body) => {
					let { connect_address, auth, build, desc, links } = body;

					const embed = new Discord.MessageEmbed()
						.setTitle(`${build?.fork_id || 'Error'}   -   Server Information`)
						.setURL(server)
						.setDescription(desc || 'No description')
						.setColor('GREY');

					links.forEach((link) => {
						embed.addField(`${link.name}`, `${link.url}`, true);
					});

					message.channel.send({ embeds: [embed] });
				});
		} catch (error) {
			return message.channel.send({ content: `Something went wrong, try again later.` });
		}
	},
};
