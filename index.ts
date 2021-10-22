/*-------------------------------------------------------------------------------REQUIREMENTS-------------------------------------------------------------------------------*/

const Discord = require('discord.js');
const client = new Discord.Client({ intents: 1003 });
const Levels = require('discord-xp');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const rgb = require("lolcatjs");
const log = require("prompt-sync")();
const { Player } = require("discord-music-player");
const { DiscordTogether } = require("discord-together");
require('dotenv').config();

const player = new Player(client, {
    leaveOnEmpty: true,
    leaveOnStop: true,
    deafenOnJoin: true,
    volume: 100,
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
client.discordTogether = new DiscordTogether(client);

/*---------------------------------------------------------------------------------HANDLING---------------------------------------------------------------------------------*/

const handlers = fs.readdirSync("./utils/handlers").filter(file => file.endsWith(".ts"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".ts"));
const messageCommandFolders = fs.readdirSync("./commands/messageCommands");
const slashCommandFolders = fs.readdirSync("./commands/slashCommands");

/*-----------------------------------------------------------------------------------LOGIN-----------------------------------------------------------------------------------*/

(async () => {
    for (File of handlers) {
        require(`./utils/handlers/${File}`)(client);
    };

    process.setMaxListeners(0);
    require('events').EventEmitter.defaultMaxListeners = 0;
    client.setMaxListeners(0);

    await client.handleEvents(eventFiles, "./events");
    await client.handleMessageCommands(messageCommandFolders, "./commands/messageCommands");
    await client.handleSlashCommands(slashCommandFolders, "./commands/slashCommands");
    await rgb.fromString(`Loaded Events: ${client.en}\nLoaded messageCommands: ${client.mcn}\nLoaded slashCommands: ${client.scn}`);
    await client.login(process.env.TOKEN);

    process.title = 'SimpleModBot Server Host';
})();

/*---------------------------------------------------------------------------------ANTICRASH---------------------------------------------------------------------------------*/

process.on("unhandledRejection", (reason, p) => {
    console.log(" [antiCrash] :: Unhandled Rejection/Catch");
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch");
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(" [antiCrash] :: Multiple Resolves");
    console.log(type, promise, reason);
});

/*---------------------------------------------------------------------------------FUNCTIONS---------------------------------------------------------------------------------*/

async function paginate(message, pages) {
    const { MessageActionRow, MessageSelectMenu } = require("discord.js");

    if (!pages || !message) throw new TypeError(`Please supply both message and a pages array!`);
    let count = 0;
    let pos = 0;
    let dropdowns = [];

    pages.forEach(() => {
        const newPos = pos++
        dropdowns.push({
            label: `${pages[newPos].title}`,
            description: `Click to go to page ${newPos + 1}`,
            value: `${newPos}`
        });
    });

    const row = new MessageActionRow()
        .addComponents([
            new MessageSelectMenu()
                .setPlaceholder("Choose a page to go to.")
                .addOptions(dropdowns)
                .setCustomId("queue_pagination")
        ]);
    
    const baseMessage = await message.reply({ embeds: [pages[count]], components: [row], allowedMentions: { repliedUser: false }});
    const collector = baseMessage.componentCollector({ componentType: "SELECT_MENU", time: 60000 });

    collector.on("collect", async (interaction) => {
        if (interaction.isSelectMenu()) {
            if (interaction.customId === "queue_pagination") {
                if (interaction.user.id !== message.author.id) return;
                const newPage = interaction.values[0];
                await interaction.deferUpdate();
                await interaction.message.edit({ embeds: [pages[newPage]] });
            };
        };
    });
};

/*---------------------------------------------------------------------------------FUNCTIONS---------------------------------------------------------------------------------*/

client.paginate = paginate;