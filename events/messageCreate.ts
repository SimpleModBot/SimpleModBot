const Discord = require('discord.js');
const Levels = require('discord-xp');
const mongis = require('../database/mongoose.ts');
const schema = require('../database/models/ccSchema.ts');
const mongoose = require('mongoose');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        await mongis.init();
        client.emit('antiInviteMessageCreate', message, client);

        if (message.channel.type == 'DM') return;
        if (message.author.bot) return;

        const Guild = require('../database/models/guildSchema.ts');
        const guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (guildProfile) client.prefix = guildProfile.prefix;

        let balanceDB = client.data.getBalanceDB(message.author.id);
        let blacklistDB = client.data.getBlacklistDB(message.author.id);
        let guildDB = client.data.getGuildDB(message.guild.id);
        let inventoryDB = client.data.getInventoryDB(message.author.id);

        let data = {
            config: "An Error Occured Loading This Information.",
            balance: "An Error Occured Loading This Information.",
            blacklisted: "An Error Occured Loading This Information.",
            guild: "An Error Occured Loading This Information.",
            inventory: "An Error Occured Loading This Information."
        };

        data.config = client;
        data.balance = balanceDB;
        data.blacklisted = blacklistDB;
        data.guild = guildDB;
        data.inventory = inventoryDB;

        const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        if (message.content == `<@!${client.user.id}>`) return message.channel.send({ embeds: [new Discord.MessageEmbed().setTitle("It appears you mentioned me!").setDescription(`Hello! I am SimpleModBot! An easy to use multipurpose bot.\n\nIf you wish to know my prefix its set to \`${client.prefix}\` but you can change it if your the owner!\nI will always have <@${client.user.id}> as a prefix though!\n\nIf you wish to know my commands type \`${client.prefix}help\`.`).setFooter('I hope you like me!').setTimestamp().setColor('GREY')] })

        const [, matchedPrefix] = message.content.match(prefixRegex);
        let args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        if (!args[1]) args[1] = "ENA";
        args = args.filter(e => e);
        let commandName = args.shift().toLowerCase();

        const dataa = await schema.findOne({ Guild: message.guild.id, Command: commandName });
        if (dataa) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(dataa.Response).setFooter(`CustomCommand: ${dataa.Command}`).setColor("GREY").setTimestamp()] });

        let command = client.messageCommands.get(commandName) || client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        let profile = await require("../database/models/blackListSchema.ts").findOne({
            userID: message.author.id
        });
        if (profile) return message.channel.send({ content: 'You cannot use this bot as you are banned. You can appeal in the support server: https://discord.gg/26NtPVvNCU' });
        if (command.devOnly == true && message.author.id !== client.ownerID) return message.channel.send({ content: 'You don\'t have permission to use this command as it is only for developers.' });

        const { cooldowns } = client;
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id) && message.author.id !== client.ownerID) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.` });
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if (message.channel.type !== 'DM') {
            if (guildDB && guildDB.levelSystem && guildDB.levelSystem == true) {
                const randomXP = Math.floor(Math.random() * 29) + 1;
                const hasLeveledUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
                if (hasLeveledUP) {
                    const user = await Levels.fetch(message.author.id, message.guild.id);
                    message.channel.send({ content: `${message.member.user.tag}, you have leveled up to ${user.level}!` })
                        .then((lvlmsg) => {
                            lvlmsg.delete({ timeout: 3500 });
                        });
                };
            };
        };

        try {
            await client.channels.cache.get('883251143151599646').send({ embeds: [new Discord.MessageEmbed().setDescription(`${message.author}(${message.author.tag}) used \`${command.name} ${args.join(' ').replace('ENA', '')}\`.`).setColor('GREY').setTimestamp()] });
            await command.execute(message, args, data, client);
        } catch (err) {
            if (command.name == 'embed') return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("An error occurred whilst running this command!\nIt is most likely from an invalid color, you can probably fix this by:\nMaking the color a valid hex code.\nMaking an all caps color name like GREY or RED\nOr you probably added a space after \`-c\`").setColor("GREY").setTimestamp()] });
            else {
                require("log4js").getLogger(`default`).error(err);

                const errorChannel = client.channels.cache.get("832744410998767666");
                const errorMessage = new Discord.MessageEmbed()
                    .setTitle("An error has occured!")
                    .setDescription("** **" + err)
                    .setTimestamp()
                    .setColor("#ff0a0a");

                errorChannel.send({ embeds: [errorMessage] });
                message.channel.send({ content: "An error occured within the bot. If you are a dev or log viewer please review the error in <#832744410998767666>" });
            };
        };
    },
};