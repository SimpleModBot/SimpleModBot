const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const Levels = require('discord-xp');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
require('dotenv').config();

Levels.setURL(`mongodb+srv://DEATHB4DEFEAT:${process.env.PASS}@cluster0.vzyir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
client.prefix = '//';
client.ownerID = '750880076555354185';
client.data = require("./database/mongoose.ts");
client.hourlymessageCommands = 0;
client.messageCommands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.snipes = new Discord.Collection();

const handlers = fs.readdirSync("./utils/handlers").filter(file => file.endsWith(".ts"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".ts"));
const messageCommandFolders = fs.readdirSync("./commands/messageCommands");
const slashCommandFolders = fs.readdirSync("./commands/slashCommands");

(async () => {
    for (file of handlers) {
        require(`./utils/handlers/${file}`)(client);
    };

    process.setMaxListeners(0);
    require('events').EventEmitter.defaultMaxListeners = 0;
    client.setMaxListeners(0);
    client.handleEvents(eventFiles, "./events");
    client.handleMessageCommands(messageCommandFolders, "./commands/messageCommands");
    client.login(process.env.TOKEN);
    client.handleSlashCommands(slashCommandFolders, "./commands/slashCommands");
})();