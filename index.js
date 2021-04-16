const Discord = require('discord.js');
const Levels = require('discord-xp');
const client = new Discord.Client();
const mongoose = require('./database/mongoose');
const fs = require('fs');
const dotenv = require('dotenv').config();

Levels.setURL(`mongodb+srv://DEATHB4DEFEAT:${process.env.PASS}@cluster0.vzyir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
client.prefix = '//';
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

mongoose.init();
client.login(process.env.TOKEN);