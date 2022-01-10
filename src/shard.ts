const { ShardingManager } = require('discord.js');
// @ts-ignore
const chalk = require('chalk');
require('dotenv').config();

const manager = new ShardingManager('./index.ts', {
    token: process.env.TOKEN,
    totalShards: 'auto',
    respawn: true,
    shardArgs: [  ],
});

manager.on('shardCreate', async (shard) => {
    console.log(chalk.yellow(`[Shard ${shard.id}]`) + ` Shard created.`);

    shard.on('death', async () => {
        console.log(chalk.red(`[Shard ${shard.id}]`) + ` Shard died.`);
    });

    shard.on('ready', async () => {
        console.log(chalk.green(`[Shard ${shard.id}]`) + ` Shard ready.`);
    });
});

manager.spawn();