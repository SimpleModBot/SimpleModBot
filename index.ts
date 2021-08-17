const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const Levels = require('discord-xp');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
require('dotenv').config();

Levels.setURL(`mongodb+srv://DEATHB4DEFEAT:${process.env.PASS}@cluster0.vzyir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
client.prefix = 't/';
client.ownerID = '750880076555354185';
client.data = require("./database/mongoose.ts");
client.hourlyCommands = 0;
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.snipes = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".ts"));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.ts'));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    };
};

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    };
};

process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0;
client.setMaxListeners(0);
client.login(process.env.TOKEN);