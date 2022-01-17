const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'botinfo',
	aliases: ['clientinfo'],
	cooldown: 5,
	async execute(message, args, data, client) {
		let usersCount = 0;
		for (const guild of client.guilds.cache) {
			usersCount += (await guild[1].members.fetch()).size;
		}

		const Developer = client.users.cache.get(client.ownerID);
		let Uptime = await client.functions.getUptime();

		const embed = new Discord.MessageEmbed()
			.setTitle(`Client Information`)
			.addField(`Name | ID`, `\`\`\`${client.user.tag}\n${client.user.id}\`\`\``, true)
			.addField(`Bot ping`, `\`\`\`Latency: ${Date.now() - message.createdTimestamp} ms\nAPI Latency: ${Math.round(client.ws.ping)} ms\`\`\``, true)
			.addField(`Made using`, `\`\`\`\nDiscord.js\nNode.js\nMongoDB\`\`\``, true)
			.addField(`Creation date`, `\`\`\`${moment.utc(client.user.createdAt).format('DD/MMM/YYYY')}\`\`\``, true)
			.addField(`Commands`, `\`\`\`${client.messageCommands.size} msgCmds\n${client.slashCommands.size} sCmds\`\`\``, true)
			.addField(`Prefix`, `\`\`\`${client.prefix}\n<@${client.user.id}>\`\`\``, true)
			.addField(`Client guild count`, `\`\`\`${client.guilds.cache.size} Servers\`\`\``, true)
			.addField(`Client channel count`, `\`\`\`${client.channels.cache.size} Channels\`\`\``, true)
			.addField(`Client user count`, `\`\`\`${usersCount} Users\`\`\``, true)
			.addField(`Uptime`, `\`\`\`${Uptime.replace(/`/g, '')}\`\`\``, true)
			.addField(`Developer`, `\`\`\`${Developer.tag}\n${client.ownerID}\`\`\``, true)
			.addField(`Bot Links`, `[Bot Invite](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1496732527734&scope=bot%20applications.commands)\n[Support/Community Server](https://discord.gg/49KeKwXc8g)`)
			.setAuthor(client.user.tag, client.user.displayAvatarURL())
			.setColor('GREY')
			.setTimestamp();

		message.channel.send({ embeds: [embed] });
	},
};
