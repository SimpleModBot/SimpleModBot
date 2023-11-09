const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'editsnipe',
	async execute(message, args, data, client) {
		if (!message.member.permissions.has('MANAGE_MESSAGES') && !message.author.id == client.ownerID) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription('You do not have permission to use this.').setColor('GREY')] });

		const snipes = client.editsnipes.get(message.channel.id);
		if (!snipes) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription('There is nothing to snipe!').setColor('GREY')] });

		const snipe = +args[0] - 1 || 0;
		const target = snipes[snipe];
		if (!target) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`There is only ${snipes.length} edits!`).setColor('GREY')] });

		const { msg1, msg2, image, time } = target;
		message.channel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setAuthor({ name: msg1.author.tag, iconURL: msg1.author.displayAvatarURL({ dynamic: true }) })
					.setDescription(`Old:\n\`\`\`\n${msg1.content}\n\`\`\`\nNew:\n\`\`\`\n${msg2.content}\n\`\`\``)
					.setImage(image)
					.setFooter({ text: `${moment(time).fromNow()} | ${snipe + 1}/${snipes.length}` })
					.setColor('GREY'),
			],
		});
	},
};
