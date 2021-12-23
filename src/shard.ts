const { ShardingManager } = require('discord.js');
// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const rgb = require("lolcatjs");
require('dotenv').config();

const manager = new ShardingManager('./index.ts', {
    token: process.env.TOKEN,
    totalShards: 'auto',
    respawn: true,
    shardArgs: [ process.env.TOKEN, ],
});

manager.on('shardCreate', async (shard) => {
    console.log(chalk.green(`[Shard ${shard.id}]`) + ` Shard created.`);
});

manager.spawn();