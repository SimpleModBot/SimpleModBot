// @ts-ignore
const Discord = require('discord.js');

module.exports = {
	name: 'say',
	description: 'No description.',
	userPermissions: ['SEND_MESSAGES'],
	botPermissions: ['SEND_MESSAGES'],
	options: [
		{
			name: 'message',
			description: 'What you would like to say.',
			type: 'STRING',
			required: true,
		},
		{
			name: 'channel',
			description: 'The channel you would like to send the message in.',
			type: 'CHANNEL',
			channelTypes: ['GUILD_TEXT'],
			required: false,
		},
		{
			name: 'devoption',
			description: 'Option for developers. :)',
			type: 'BOOLEAN',
			required: false,
		},
	],
	async execute(interaction, args, client) {
		const message = interaction.options.getString('message');
		let channel = interaction.options.getChannel('channel');
		const devoption = interaction.options.getBoolean('devoption');
		const sayEmbed = new Discord.MessageEmbed().setDescription(message.replace('\\n', '\n')).setColor('GREY');

		if (channel) {
			channel = await interaction.guild.channels.cache.get(channel.id);
		} else channel = interaction.channel;
		if (!channel?.permissionsFor(interaction.member)?.has('SEND_MESSAGES'))
			interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You do not have the SEND_MESSAGES permission for that channel.`).setColor('GREY')], ephemeral: true });

		if (devoption == true) {
			if (!client.devIDs.includes(interaction.member.id))
				interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You aren't a developer, therefore you do not have the permission to perform this action.`).setColor('GREY')], ephemeral: true });
			else {
				channel.send({ embeds: [sayEmbed] });
			}
		} else if (devoption !== true) {
			sayEmbed.setFooter({ text: interaction.member.user.username, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) }).setTimestamp();
			channel.send({ embeds: [sayEmbed] });
		}

		if (!interaction.replied == true) interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Your message has been sent to ${channel.name}.`).setColor('GREY')], ephemeral: true });
	},
};
