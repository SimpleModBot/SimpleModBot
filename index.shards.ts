const { ShardingManager } = require('discord.js');
const figlet = require('figlet');
const chalk = require('chalk');
require('dotenv').config();

const manager = new ShardingManager('./index.ts', {
    totalShards: 'auto',
    token: process.env.TOKEN
});

manager.on('shardCreate', (shard) => {
    console.log(chalk.grey.bgBlack.bold(figlet.textSync(`#${shard.id + 1} Is Alive!`, {
        font: 'Standard',
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted',
        width: 100,
        whitespaceBreak: true
    })))

    shard.on('death', (process) => {
        console.log(chalk.red.bgBlack.bold(figlet.textSync(`#${shard.id + 1} Has Died!`, {
            font: 'Standard',
            horizontalLayout: 'fitted',
            verticalLayout: 'fitted',
            width: 100,
            whitespaceBreak: true
        })));
    });
});

manager.spawn();