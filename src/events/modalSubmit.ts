// @ts-ignore
const Discord = require('discord.js');
// @ts-ignore
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'modalSubmit',
	async execute(modal, client) {
		if (modal.customId === 'evalmodal') {
			const code = modal.getTextInputValue('evalform').toString();
			// modal.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Running evaluation..`).setColor('GREY')], ephemeral: true });

			try {
				const old = Date.now();
				let evaled = await eval(code);
				let rawEvaled = evaled;
				if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 2 });

				let dataType = Array.isArray(rawEvaled) ? 'Array<' : typeof rawEvaled,
					dataTypes = [];
				if (~dataType.indexOf('<')) {
					rawEvaled.forEach((d) => {
						if (~dataTypes.indexOf(Array.isArray(d) ? 'Array' : typeof d)) return;
						dataTypes.push(Array.isArray(d) ? 'Array' : typeof d);
					});
					dataType += dataTypes.map((s) => s[0].toUpperCase() + s.slice(1)).join(', ') + '>';
				}
				evaled = clean(evaled);

				let pages = [];

				if (evaled.length > 1000) {
					const variable = client.functions.splitLength(evaled, 1000);
					variable.forEach((v) => {
						const embed = new Discord.MessageEmbed()
							.setTitle(`Evaluated in ${Math.round(Date.now() - old)}ms`)
							.addField('[INPUT]', `\`\`\`ts\n${code}\n\`\`\``)
							.setDescription('**[OUTPUT]**' + `\n\`\`\`ts\n${v}\n\`\`\``)
							.addField('[TYPE]', `\`\`\`ts\n${dataType.substr(0, 1).toUpperCase() + dataType.substr(1)}\n\`\`\``)
							.setColor('GREY');

						pages.push(embed);
					});
				} else {
					const embed = new Discord.MessageEmbed()
						.setTitle(`Evaluated in ${Math.round(Date.now() - old)}ms`)
						.addField('[INPUT]', `\`\`\`ts\n${code}\n\`\`\``)
						.setDescription('**[OUTPUT]**' + `\n\`\`\`ts\n${evaled}\n\`\`\``)
						.addField('[TYPE]', `\`\`\`ts\n${dataType.substr(0, 1).toUpperCase() + dataType.substr(1)}\n\`\`\``)
						.setColor('GREY');

					pages.push(embed);
				}

				if (!pages || !modal) throw new TypeError(`Please supply both modal and a pages array!`);
				let count = 0;
				let pos = 0;
				let dropdowns = [];

				pages.forEach(() => {
					const newPos = pos++;
					dropdowns.push({
						label: `${pages[newPos].title}`,
						description: `Click to go to page ${newPos + 1}`,
						value: `${newPos}`,
					});
				});

				const row = new MessageActionRow().addComponents([new MessageSelectMenu().setPlaceholder('Choose a page to go to.').addOptions(dropdowns).setCustomId('queue_pagination')]);

				const baseMessage = await modal.channel.send({ embeds: [pages[count]], components: [row] });
				const collector = baseMessage.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 60000 });

				collector.on('collect', async (i) => {
					if (i.isSelectMenu()) {
						if (i.customId === 'queue_pagination') {
							if (i.user.id !== modal.member.id) return;
							const newPage = i.values[0];
							await i.update({ embeds: [pages[newPage]] });
						}
					}
				});
			} catch (err) {
				modal.reply({ embeds: [new Discord.MessageEmbed().setDescription(`\`ERROR\` \`\`\`ts\n${clean(err)}\n\`\`\``).setColor('GREY')], ephemeral: true });
			}

			function clean(text) {
				if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
				else return text;
			};
		}
	},
};
