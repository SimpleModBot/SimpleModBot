// @ts-ignore
const Discord = require('discord.js');

module.exports = {
	name: 'emojisearch',
	description: 'Searches for emojis.',
	devOnly: false,
	userPermissions: ['SEND_MESSAGES', 'MANAGE_EMOJIS_AND_STICKERS'],
	botPermissions: ['SEND_MESSAGES', 'MANAGE_EMOJIS_AND_STICKERS', 'USE_EXTERNAL_EMOJIS'],
	options: [
		{
			name: 'search',
			description: 'Emoji search query.',
			type: 'STRING',
			required: true,
		},
		{
			name: 'animated',
			description: 'If you want the emojis to be animated or not.',
			type: 'BOOLEAN',
			required: false,
			default: false,
		},
		{
			name: 'name',
			description: 'Sets the name of the new emoji.',
			type: 'STRING',
			required: false,
			default: 'newemoji',
		},
	],
	async execute(interaction, args, client) {
		// await interaction.deferReply();

		const emojiSearch = interaction.options.getString('search');
		const animated = interaction.options.getBoolean('animated');
		const emojiName = interaction.options.getString('name');
		const emojis = await client.emojis.cache.filter((e) => e.name.toLowerCase().includes(emojiSearch.toLowerCase()));

		if (emojis.size < 1) {
			interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`I found \`0\` emojis matching your query \`${emojiSearch}\`.\nMaybe try again or invite me to more guilds.`).setColor('GREY')], ephemeral: true });
		} else {
			let emojiList = [];

			await emojis.map((e) => {
				if (!e.available) return;
				if (e.animated == true) {
					if (animated == true) emojiList.push(`<a:${e.name}:${e.id}>`);
                } else {
					if (animated == false) emojiList.push(`<:${e.name}:${e.id}>`);
				}
			});

			interaction.reply({
				embeds: [
					new Discord.MessageEmbed()
						.setDescription(`I found \`${emojiList.length}\` emojis matching your query \`${emojiSearch}\` while animated being \`${animated}\`.\n${emojiList.join('  ')}`)
						// .setFooter({ text: "If you don't see external emojis you need to enable the permission for @everyone in this channel." })
						.setColor('GREY'),
				],
			});
		}
	},
};
// tell me when to restart bot to testing
// <a:emoji_name:emoji_id>   <:emoji_name:emoji_id>
