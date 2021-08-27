const mongoose = require("mongoose");
const figlet = require('figlet');
const chalk = require('chalk');
require('dotenv').config();

module.exports = {
    init: async() => {
        const dbOptions = {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 10,
            connectTimeoutMS: 10000,
            family: 4
        };

        const connection = mongoose.createConnection(`mongodb://127.0.0.1:27017/SMB`, dbOptions);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('err', (err) => {
            console.log(chalk.red.bgBlack.bold(figlet.textSync("Error!", {
                font: 'Standard',
                horizontalLayout: 'fitted',
                verticalLayout: 'fitted',
                width: 100,
                whitespaceBreak: true
            }) + err));
        });

        const balancesDB = require("./models/balanceSchema.ts");
        const blacklistsDB = require("./models/blackListSchema.ts");
        const guildsDB = require("./models/guildSchema.ts");
        const inventoriesDB = require("./models/inventorySchema.ts");

        module.exports.getBalanceDB = async function (userID) {
            let balanceDB = await balancesDB.findOne({ userID: userID });
            if (balanceDB) {
                return balanceDB;
            } else {
                return "User Doesn't Have A Bot Wallet.";
            };
        };

        module.exports.getBlacklistDB = async function (userID) {
            let blacklistDB = await blacklistsDB.findOne({ userID: userID });
            if (blacklistDB) {
                return blacklistDB;
            } else {
                return "User Is Not Blacklisted.";
            };
        };

        module.exports.getGuildDB = async function (guildID) {
            let guildDB = await guildsDB.findOne({ guildID: guildID });
            if (guildDB) {
                return guildDB;
            } else {
                return "Guild Isn't Setup With Bot.";
            };
        };

        module.exports.getInventoryDB = async function (userID) {
            let inventoryDB = await inventoriesDB.findOne({ userID: userID });
            if (inventoryDB) {
                return inventoryDB;
            } else {
                return "User Doesn't Have An Inventory.";
            };
        };

        setTimeout(() => {
        connection.close();
        }, 5000);
    },
};