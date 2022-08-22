const Discord = require('discord.js');
const { PieChart } = require('canvas-pie-chart');

module.exports = {
	name: 'chatchart',
	description: 'Create a chart based on recent user activity.',
	aliases: [],
	cooldown: 5,
	async execute(message, args, data, client) {
		const mLimit = 500;

		const pEmbed = new Discord.MessageEmbed().setDescription(`**Fetching the past ${mLimit} messages.**`).setFooter({ text: 'This might take time.' }).setColor('GREY');

		message.channel.send({ embeds: [pEmbed] });

		async function fetchMore(channel, limit = mLimit) {
			if (!channel) {
				throw new Error(`Expected channel, got ${typeof channel}.`);
			}

			if (limit <= 100) {
				return channel.messages.fetch({ limit });
			}

			let collection = new Discord.Collection();
			let lastId = null;
			let options = {};
			let remaining = limit;

			while (remaining > 0) {
				options.limit = remaining > 100 ? 100 : remaining;
				remaining = remaining > 100 ? remaining - 100 : 0;

				if (lastId) options.before = lastId;
				let messages = await channel.messages.fetch(options);

				if (!messages.last()) break;

				collection = collection.concat(messages);
				lastId = messages.last().id;
			}

			return collection;
		}

		let authors = [];
		const list = await fetchMore(message.channel, mLimit);
		const arraylist = Array.from(list);

		arraylist.forEach((array) => {
			authors.push(array[1].author.id);
		});

		let frequency = {};
		authors.forEach(function (item) {
			frequency[item] = frequency[item] ? frequency[item] + 1 : 1;
		});

		let intents = Object.entries(frequency)
			.sort((a, b) => b[1] - a[1])
			.map((x) => {
				return x[0];
			});

		let finalthingyig = {};
		let chartlabels = [];

		for (const u of intents) {
			try {
				const newe = await client.users.fetch(u);
				if (newe.bot) continue;

				if (frequency[u] > 20) {
					finalthingyig[newe.tag] = frequency[u];
				} else {
					if (finalthingyig['Others']) {
						finalthingyig['Others'] = finalthingyig['Others'] + frequency[u];
					} else finalthingyig['Others'] = frequency[u];
				}
			} catch (e) {
				Promise.reject(e);
			}
		}

		for (let i = 0; i < Object.keys(finalthingyig).length; i++) {
			chartlabels.push({
				text: Object.keys(finalthingyig)[i],
				size: Object.values(finalthingyig)[i],
			});
		}

		const chart = new PieChart({
			labels: chartlabels,
			blackOrWhiteInvert: false,
			size: 1024,
		});

		const buffer = chart.draw();
		const attachment = new Discord.MessageAttachment(buffer, 'chart.png');

		const embed = new Discord.MessageEmbed()
			.setTitle(`**Chatchart of the past ${mLimit} messages in this channel**`)
			.setDescription(
				`🥇**${Object.keys(finalthingyig)[0]}** │ \`${Object.values(finalthingyig)[0]} [${(Object.values(finalthingyig)[0] / mLimit) * 100}%]\`
🥈**${Object.keys(finalthingyig)[1]}** │ \`${Object.values(finalthingyig)[1]} [${(Object.values(finalthingyig)[1] / mLimit) * 100}%]\`
🥉**${Object.keys(finalthingyig)[2]}** │ \`${Object.values(finalthingyig)[2]} [${(Object.values(finalthingyig)[2] / mLimit) * 100}%]\``,
			)
			.setImage('attachment://chart.png')
			.setColor('GREY');

		message.reply({ embeds: [embed], files: [attachment] });
	},
};
