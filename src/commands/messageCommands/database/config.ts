const Guild = require('../../../database/models/guildSchema.ts');
const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
// @ts-ignore
const Discord = require('discord.js');
// @ts-ignore
const mongoose = require('mongoose');

module.exports = {
	name: 'config',
	cooldown: 5,
	description: 'Allows the server owner to change the guild settings.',
	async execute(message, args, data, client) {
		if (!message.author.id == message.guild.ownerID && message.author.id == '750880076555354185')
			return message.channel.send({
				embeds: [new Discord.MessageEmbed().setDescription('You do not have permission to use this command as you are not the server owner.').setColor('GREY')],
			});

		let guildProfile = await Guild.findOne({ guildID: message.guild.id });
		if (!guildProfile) {
			guildProfile = await new Guild({
				_id: mongoose.Types.ObjectId(),
				guildID: message.guild.id,
			});
			await guildProfile.save().catch((err) => Promise.reject(new err()));
		}

		if (args[0] == 'ENA') {
			const prefix = new MessageEmbed()
				.setTitle('prefix')
				.setDescription(
					`The current prefixes are\n\`${client.prefixes.join(', ')}\`
			To add a new prefix, type \`${client.prefix}config add prefix <prefix>\`.
			To remove a prefix, type \`${client.prefix}config remove prefix <prefix>\`.`,
				)
				.setTimestamp()
				.setColor('GREY');

			const memberRoleID = new MessageEmbed()
				.setTitle('memberRole')
				.setDescription(
					`The current memberRole is ${guildProfile.memberRoleID}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove memberRole <input>\``,
				)
				.setTimestamp()
				.setColor('GREY');

			const modlogChannelID = new MessageEmbed()
				.setTitle('modlogChannel')
				.setDescription(
					`The current modlogChannel is ${guildProfile.modlogChannelID}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove modlogChannel <input>\``,
				)
				.setTimestamp()
				.setColor('GREY');

			const antiInvite = new MessageEmbed()
				.setTitle('antiInvite')
				.setDescription(
					`The current antiInvite is ${guildProfile.antiInvite}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove antiInvite\``,
				)
				.setTimestamp()
				.setColor('GREY');

			const welcomeChannelID = new MessageEmbed()
				.setTitle('welcomeChannel')
				.setDescription(
					`The current welcomeChannel is ${guildProfile.welcomeChannelID}
                To change or remove/reset it use:
                \`${client.prefix}config add/remove welcomeChannel <channel>\``,
				)
				.setTimestamp()
				.setColor('GREY');

			const pages = [prefix, memberRoleID, modlogChannelID, antiInvite, welcomeChannelID];
			client.functions.paginate(message, pages);
		} else {
			if ('add' === args[0]) {
				if ('prefix' === args[1]) {
					if (!args[2]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me a prefix to add.`).setColor('GREY')] });
					const a = await Guild.findOne({ guildID: message.guild.id });
					const prefix = args.slice(2).join(' ');

					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefixes: [...a.prefixes, prefix], lastEdited: Date.now() });

					message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Added prefix \`${prefix}\` successfully!`).setColor('GREY')] });
				} else if ('muteRole' === args[1]) {
					if (!args[2])
						return message.channel.send({
							embeds: [new Discord.MessageEmbed().setDescription('You did not state a value to update that property to.').setColor('GREY')],
						});
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muteRoleID: args[2], lastEdited: Date.now() });
					message.channel.send({
						content: `Updated: ${args[1]} to ${args[2]} succesfully!`,
					});
				} else if ('memberRole' === args[1]) {
					if (!args[2])
						return message.channel.send({
							embeds: [new Discord.MessageEmbed().setDescription('You did not state a value to update that property to.').setColor('GREY')],
						});
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: args[2], lastEdited: Date.now() });
					message.channel.send({
						content: `Updated: ${args[1]} to ${args[2]} succesfully!`,
					});
				} else if ('modlogChannel' === args[1]) {
					if (!args[2])
						return message.channel.send({
							embeds: [new Discord.MessageEmbed().setDescription('You did not state a value to update that property to.').setColor('GREY')],
						});
					const modlogChannel = message.mentions.channels.first();
					if (!modlogChannel) return;
					await Guild.findOneAndUpdate(
						{ guildID: message.guild.id },
						{
							modlogChannelID: modlogChannel.id,
							lastEdited: Date.now(),
						},
					);
					message.channel.send(`Updated: ${args[1]} to ${modlogChannel} succesfully!`);
				} else if ('antiInvite' === args[1]) {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { antiInvite: true });
					message.channel.send({
						content: 'antiInvite is now toggled on!',
					});
				} else if ('welcomeChannel' === args[1]) {
					if (!args[2])
						return message.channel.send({
							embeds: [new Discord.MessageEmbed().setDescription('You did not state a value to update that property to.').setColor('GREY')],
						});
					const welcomeChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);
					if (!welcomeChannel) return;
					await Guild.findOneAndUpdate(
						{ guildID: message.guild.id },
						{
							welcomeChannelID: welcomeChannel.id,
							lastEdited: Date.now(),
						},
					);
					message.channel.send(`Updated: ${args[1]} to ${welcomeChannel} succesfully!`);
				} else
					return message.channel.send({
						embeds: [new Discord.MessageEmbed().setDescription('You need to say a property to update.').setColor('GREY')],
					});
			} else if ('remove' === args[0]) {
				if ('prefix' === args[1]) {
					if (!args[2]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give me a prefix to remove.`).setColor('GREY')] });
					const a = await Guild.findOne({ guildID: message.guild.id });
					const prefix = args.slice(2).join(' ');

					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefixes: a.prefixes.filter((e) => e !== prefix), lastEdited: Date.now() });

					message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Removed prefix \`${prefix}\` successfully!`).setColor('GREY')] });
				} else if ('muteRole' === args[1]) {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { muteRoleID: 'undefined', lastEdited: Date.now() });
					message.channel.send({
						embeds: [new Discord.MessageEmbed().setDescription(`Deleted ${args[1]} successfully!`).setColor('GREY')],
					});
				} else if ('memberRole' === args[1]) {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: 'undefined', lastEdited: Date.now() });
					message.channel.send({
						embeds: [new Discord.MessageEmbed().setDescription(`Deleted ${args[1]} successfully!`).setColor('GREY')],
					});
				} else if ('modlogChannel' === args[1]) {
					await Guild.findOneAndUpdate(
						{ guildID: message.guild.id },
						{
							modlogChannelID: 'undefined',
							lastEdited: Date.now(),
						},
					);
					message.channel.send({
						embeds: [new Discord.MessageEmbed().setDescription(`Deleted ${args[1]} successfully!`).setColor('GREY')],
					});
				} else if ('antiInvite' === args[1]) {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { antiInvite: false });
					message.channel.send({
						content: 'antiInvite is now toggled off!',
					});
				} else if ('welcomeChannel' === args[1]) {
					await Guild.findOneAndUpdate(
						{ guildID: message.guild.id },
						{
							welcomeChannelID: 'undefined',
							lastEdited: Date.now(),
						},
					);
					message.channel.send({
						embeds: [new Discord.MessageEmbed().setDescription(`Deleted ${args[1]} successfully!`).setColor('GREY')],
					});
				} else
					return message.channel.send({
						content: 'You need to say a property to delete.',
					});
			} else
				return message.channel.send({
					content: 'You need to say if you want to `add` or `remove` a property.',
				});
		}
	},
};
