const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.channel) return;

        if (interaction.isButton()) {
            if (interaction.customId === 'tic') {
                const thread = await interaction.channel.threads.create({
                    name: `${interaction.user.tag}`,
                    autoArchiveDuration: 'MAX',
                    reason: 'Thread for support from staff.',
                });

                await thread.setLocked(true);

                const embed = new MessageEmbed()
                    .setTitle('Ticket')
                    .setDescription('Hello there!\nThe staff will be here as soon as possible, while you wait you can explain your issue.')
                    .setColor('GREY')
                    .setTimestamp()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }));

                const del = new MessageActionRow()
                    .addComponents(new MessageButton()
                        .setCustomId('del')
                        .setLabel('🗑️ Delete Ticket!')
                        .setStyle('DANGER'));

                thread.send({
                    content: `Welcome <@${interaction.user.id}>!`,
                    embeds: [embed],
                    components: [del]
                }).then(interaction.channel.send({
                    content: 'Created Ticket!',
                    ephemeral: true
                }));

                const ch = await client.channels.cache.get('915827131534168105');
                ch.send({ embeds: [new Discord.MessageEmbed().setDescription(`${interaction.user.tag}(${interaction.user.id}) created a ticket!`).setTimestamp().setColor('GREY')] });

                setTimeout(() => {
                    interaction.channel.bulkDelete(2);
                }, 5000);

            } else if (interaction.customId === 'del') {
                const thread = interaction.channel;
                thread.setArchived(true);
            };
        };

        if (interaction.isCommand()) {
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return;

            await command.execute(interaction, client);
        };
    },
};