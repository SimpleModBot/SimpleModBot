// @ts-ignore
const Discord = require('discord.js');
const { exec } = require('child_process');

module.exports = {
	name: 'execute',
	aliases: ['exec', 'cmd'],
	devOnly: true,
	cooldown: 3,
	async execute(message, args, data, client) {
		const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('evalbtn').setLabel('Delete output').setStyle('DANGER'));
		let cmd = args.join(' ');
		if (!cmd) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Try again, except this time, give me something to execute.`).setColor('GREY')] });

		exec(`${cmd}`, (error, stdout) => {
			let response = error || stdout;
			if (error) {
				message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`\`\`\`ts\n${error.message}\n\`\`\``).setColor('GREY')], components: [row] });
			} else {
				message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`\`\`\`ts\n${response}\n\`\`\``).setColor('GREY')], components: [row] });
			}
		});
	},
};
