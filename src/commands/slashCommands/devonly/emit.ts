// @ts-ignore
const Discord = require('discord.js');
const { CommandInteraction, Client } = require('discord.js');

module.exports = {
	name: 'emit',
	description: 'Emits an event.',
	devOnly: true,
	userPermissions: ['SEND_MESSAGES'],
	botPermissions: ['SEND_MESSAGES'],
	options: [
		{
			name: 'application',
			description: 'Event to pass to emit',
			type: 'STRING',
			choices: [
				{
					name: 'applicationCommandCreate',
					value: 'applicationCommandCreate',
				},
				{
					name: 'applicationCommandDelete',
					value: 'applicationCommandDelete',
				},
				{
					name: 'applicationCommandUpdate',
					value: 'applicationCommandUpdate',
				},
			],
		},
		{
			name: 'channel',
			description: 'Event to pass to emit',
			type: 'STRING',
			choices: [
				{
					name: 'channelCreate',
					value: 'channelCreate',
				},
				{
					name: 'channelDelete',
					value: 'channelDelete',
				},
				{
					name: 'channelPinsUpdate',
					value: 'channelPinsUpdate',
				},
				{
					name: 'channelUpdate',
					value: 'channelUpdate',
				},
			],
		},
		{
			name: 'emoji',
			description: 'Event to pass to emit',
			type: 'STRING',
			choices: [
				{
					name: 'emojiCreate',
					value: 'emojiCreate',
				},
				{
					name: 'emojiDelete',
					value: 'emojiDelete',
				},
				{
					name: 'emojiUpdate',
					value: 'emojiUpdate',
				},
			],
		},
		{
			name: 'guild',
			description: 'Event to pass to emit',
			type: 'STRING',
			choices: [
				{
					name: 'guildBanAdd',
					value: 'guildBanAdd',
				},
				{
					name: 'guildBanRemove',
					value: 'guildBanRemove',
				},
				{
					name: 'guildCreate',
					value: 'guildCreate',
				},
				{
					name: 'guildDelete',
					value: 'guildDelete',
				},
				{
					name: 'guildIntegrationsUpdate',
					value: 'guildIntegrationsUpdate',
				},
				{
					name: 'guildMemberAdd',
					value: 'guildMemberAdd',
				},
				{
					name: 'guildMemberAvailable',
					value: 'guildMemberAvailable',
				},
				{
					name: 'guildMemberRemove',
					value: 'guildMemberRemove',
				},
				{
					name: 'guildMembersChunk',
					value: 'guildMembersChunk',
				},
				{
					name: 'guildMemberUpdate',
					value: 'guildMemberUpdate',
				},
				{
					name: 'guildUnavailable',
					value: 'guildUnavailable',
				},
				{
					name: 'guildUpdate',
					value: 'guildUpdate',
				},
			],
		},
		{
			name: 'message',
			description: 'Event to pass to emit',
			type: 'STRING',
			choices: [
				{
					name: 'messageCreate',
					value: 'messageCreate',
				},
				{
					name: 'messageDelete',
					value: 'messageDelete',
				},
				{
					name: 'messageDeleteBulk',
					value: 'messageDeleteBulk',
				},
				{
					name: 'messageReactionAdd',
					value: 'messageReactionAdd',
				},
				{
					name: 'messageReactionRemove',
					value: 'messageReactionRemove',
				},
				{
					name: 'messageReactionRemoveAll',
					value: 'messageReactionRemoveAll',
				},
				{
					name: 'messageReactionRemoveEmoji',
					value: 'messageReactionRemoveEmoji',
				},
				{
					name: 'messageUpdate',
					value: 'messageUpdate',
				},
			],
		},
		{
			name: 'other',
			description: 'Event to pass to emit',
			type: 'STRING',
			choices: [
				{
					name: 'interactionCreate',
					value: 'interactionCreate',
				},
				{
					name: 'invalidRequestWarning',
					value: 'invalidRequestWarning',
				},
				{
					name: 'inviteCreate',
					value: 'inviteCreate',
				},
				{
					name: 'inviteDelete',
					value: 'inviteDelete',
				},

				{
					name: 'presenceUpdate',
					value: 'presenceUpdate',
				},
				{
					name: 'rateLimit',
					value: 'rateLimit',
				},
				{
					name: 'roleCreate',
					value: 'roleCreate',
				},
				{
					name: 'roleDelete',
					value: 'roleDelete',
				},
				{
					name: 'roleUpdate',
					value: 'roleUpdate',
				},
				{
					name: 'stageInstanceCreate',
					value: 'stageInstanceCreate',
				},
				{
					name: 'stageInstanceDelete',
					value: 'stageInstanceDelete',
				},
				{
					name: 'stageInstanceUpdate',
					value: 'stageInstanceUpdate',
				},
				{
					name: 'stickerCreate',
					value: 'stickerCreate',
				},
				{
					name: 'stickerDelete',
					value: 'stickerDelete',
				},
				{
					name: 'stickerUpdate',
					value: 'stickerUpdate',
				},
				{
					name: 'threadCreate',
					value: 'threadCreate',
				},
				{
					name: 'threadDelete',
					value: 'threadDelete',
				},
				{
					name: 'threadListSync',
					value: 'threadListSync',
				},
				{
					name: 'threadMembersUpdate',
					value: 'threadMembersUpdate',
				},
				{
					name: 'threadMemberUpdate',
					value: 'threadMemberUpdate',
				},
				{
					name: 'threadUpdate',
					value: 'threadUpdate',
				},
				{
					name: 'typingStart',
					value: 'typingStart',
				},
				{
					name: 'userUpdate',
					value: 'userUpdate',
				},
				{
					name: 'voiceStateUpdate',
					value: 'voiceStateUpdate',
				},
			],
		},
	],
	async execute(interaction, args, client) {
		const application = interaction.options.getString('application');
		const channel = interaction.options.getString('channel');
		const emoji = interaction.options.getString('emoji');
		const guild = interaction.options.getString('guild');
		const message = interaction.options.getString('message');
		const other = interaction.options.getString('other');

        if (application) {
            client.emit(application, interaction, client);
            interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Event \`${application}\` has been emitted.`).setColor('GREY')], ephemeral: true });
        } else if (channel) {
            client.emit(channel, interaction.channel, client);
            interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Event \`${channel}\` has been emitted.`).setColor('GREY')], ephemeral: true });
        } else if (emoji) {
            client.emit(emoji, interaction, client);
            interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Event \`${emoji}\` has been emitted.`).setColor('GREY')], ephemeral: true });
        } else if (guild) {
            client.emit(guild, interaction.guild, client);
            interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Event \`${guild}\` has been emitted.`).setColor('GREY')], ephemeral: true });
        } else if (message) {
            const msg = await interaction.channel.messages.fetch({ limit: 1 });
            client.emit(message, msg, args, {}, client);
            interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Event \`${message}\` has been emitted.`).setColor('GREY')], ephemeral: true });
        } else if (other) {
            client.emit(other, interaction, client);
            interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Event \`${other}\` has been emitted.`).setColor('GREY')], ephemeral: true });
        } else {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Please specify an event to emit.`).setColor('GREY')], ephemeral: true });
        }
	},
};