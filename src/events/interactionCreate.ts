// @ts-ignore
const Discord = require('discord.js');
const mongis = require('../database/mongoose.ts');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.channel) return;
        await mongis.init();

        if (interaction.isCommand()) {
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return interaction.followUp({ content: 'An error occurred whilst running this command.' });
            let args = [];

            for (let option of interaction.options.data) {
                if (option.type == "SUB_COMMAND") {
                    if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            };

            interaction.member = await interaction.guild.members.fetch(interaction.user.id);

            if (!interaction.member.permissions.has(command.userPermissions || [])) return interaction.reply({ content: `You do not have the required permissions to run this command.`, ephemeral: true });
            if (!interaction.guild.me.permissions.has(command.botPermissions || [])) return interaction.reply({ content: `I do not have the required permissions to run this command.`, ephemeral: true });

            await command.execute(interaction, args, client);
        };



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
    },
};