// @ts-ignore
const Discord = require('discord.js');
// @ts-ignore
const fetch = require('node-fetch');
// @ts-ignore
const fs = require('fs');
// @ts-ignore
const argsToServer = require('../../../utils/handlers/ssArgsToServer.ts');
// @ts-ignore
const servers = JSON.parse(fs.readFileSync(`${__dirname}/../../../utils/json/servers.json`, 'utf8'));


module.exports = {
	name: 'ssstatus',
	description: `Get information on a Space Station 14 server\n> First argument decides what server to get information on, can be a direct http(s)://ip:port.\n> Available server aliases: ${servers.map((srv) => `\`${srv[0]}\``).join(', ')}`,
	cooldown: 15,
	async execute(message, args, data, client) {
		let server = argsToServer(args);

		fetch(`${server.endsWith('/') ? server.slice(0, -1) : server}/status`)
			.then((res) => res.json())
			.then((body) => {
				let { name, players, tags, soft_max_players, run_level, round_start_time } = body;

				const embed = new Discord.MessageEmbed()
					.setTitle(`${name}   -   Status Information`)
					.setURL(`${server}/status`)
					.addField('Players', `${players}/${soft_max_players}`)
					.addField('Start time', `${round_start_time?.replace('T', ' ').split('.')[0] + "UTC" || 'In Lobby'}`)
					.setColor('GREY');

				message.channel.send({ embeds: [embed] });
            }).catch((err) => {
                const errorEmbed = new Discord.MessageEmbed()
                    .setTitle('An error occurred')
                    .setURL(`${server}/status`)
                    .setDescription(err.message)
                    .setColor('GREY')
                return message.channel.send({ embeds: [errorEmbed] }).catch((err2) => {
                    const error2Embed = new Discord.MessageEmbed()
                        .setTitle('An error occurred')
                        .setDescription(`An error prevented the error message from being sent:\n> ${err2.message.replace(/(\r\n|\r|\n)/g, '\n> ')}\n\nOriginal error:\n> ${err.message.replace(/(\r\n|\r|\n)/g, '\n> ')}`)
                        .setColor('GREY')
                    return message.channel.send({ embeds: [error2Embed] });
                });
			});
	},
};
