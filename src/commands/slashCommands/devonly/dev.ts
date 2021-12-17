// @ts-ignore
const Discord = require('discord.js');
const ascii = require('ascii-table');
// @ts-ignore
const fetch = require('node-fetch');
let Table = new ascii("ServerList");

module.exports = {
    name: 'dev',
    description: 'Initiates a developer command prompt.',
    userPermissions: ['SEND_MESSAGES'],
    botPermissions: ['SEND_MESSAGES'],
    options: [
        {
            name: 'guildlist',
            description: 'Log the list of guilds.',
            type: 'SUB_COMMAND',
        },
        {
            name: 'test',
            description: 'No description.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'type',
                    description: 'No description.',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
    ],
    async execute(interaction, args, client) {
        const [subcommand] = args;
        if (!interaction.member.id == client.ownerID) return interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You aren't the owner!`).setColor('GREY')], ephemeral: true });

        if (subcommand == 'guildlist') guildlist();
        if (subcommand == 'test') test();



        async function guildlist() {
            Table.setHeading(" Guild Name ", " Guild ID ", " Member Count ", " Owner ");

            await client.guilds.cache.forEach(async guild => {
                await client.users.fetch(guild.ownerId).then(async user => {
                    const owner = user.tag;
                    await Table.addRow(` ${guild.name} `, ` ${guild.id} `, ` ${guild.memberCount} Users `, ` ${owner} `);
                });
            });

            await console.log(Table.toString());
            interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription("I have logged the guilds.").setColor('GREY')], ephemeral: true });
        };

        async function test() {
            await interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription("This is a test.\nAnd it has worked! ^-^").setColor('GREY')], ephemeral: true });

        };
    },
};