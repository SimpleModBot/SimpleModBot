const Discord = require('discord.js');
const client = new Discord.Client({ intents: 1003 });
const Levels = require('discord-xp');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const rgb = require("lolcatjs");
const log = require("prompt-sync")();
const { Player } = require("discord-music-player");
require('dotenv').config();

const player = new Player(client, {
    leaveOnEmpty: true,
    leaveOnStop: true,
    deafenOnJoin: true,
    volume: 200,
});

Levels.setURL(`mongodb://127.0.0.1:27017/SMB`);
client.prefix = '//';
client.ownerID = '750880076555354185';
client.data = require("./database/mongoose.ts");
client.messageCommands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.mcn = 0;
client.scn = 0;
client.en = 0;
client.cooldowns = new Discord.Collection();
client.snipes = new Discord.Collection();
client.player = player;

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
    await client.handleEvents(eventFiles, "./events");
    await client.handleMessageCommands(messageCommandFolders, "./commands/messageCommands");
    await client.handleSlashCommands(slashCommandFolders, "./commands/slashCommands");
    await rgb.fromString(`Loaded Events: ${client.en}\nLoaded messageCommands: ${client.mcn}\nLoaded slashCommands: ${client.scn}`);
    await client.login(process.env.TOKEN);
})();