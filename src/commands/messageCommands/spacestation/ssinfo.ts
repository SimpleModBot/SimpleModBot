// @ts-ignore
const Discord = require('discord.js');
// @ts-ignore
const fetch = require('node-fetch');
// @ts-ignore
const argsToServer = require('../../../utils/handlers/ssArgsToServer.ts');
// @ts-ignore
const servers = require("../../../utils/json/servers.json");


module.exports = {
	name: 'ssinfo',
	description: `Get information on a Space Station 14 server\n> First argument decides what server to get information on, can be a direct http(s)://ip:port.\n> Available server aliases: ${servers.map((srv) => `\`${srv[0]}\``).join(', ')}`,
	cooldown: 15,
	async execute(message, args, data, client) {
		let server = argsToServer(args);

		fetch(`${server}/info`)
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
			})
			.catch((err) => {
				return message.channel.send({ content: `Error:\n> ${err.message}` });
			});
	},
};
