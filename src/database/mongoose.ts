const mongoose = require("mongoose");
const figlet = require('figlet');
const chalk = require('chalk');
require('dotenv').config();

module.exports = {
    init: async() => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
        };

        await mongoose.connect(`mongodb://simplemodbot-db:27017`, dbOptions);

        const balancesDB = require("./models/balanceSchema.ts");
        const blacklistsDB = require("./models/blackListSchema.ts");
        const guildsDB = require("./models/guildSchema.ts");
        const inventoriesDB = require("./models/inventorySchema.ts");
        const readyatDB = require("./models/readyatSchema.ts");

        module.exports.getBalanceDB = async function (userID) {
            let balanceDB = await balancesDB.findOne({ userID: userID });
            if (balanceDB) {
                return balanceDB;
            } else {
                return "User doesn't have a wallet.";
            };
        };

        module.exports.getBlacklistDB = async function (userID) {
            let blacklistDB = await blacklistsDB.findOne({ userID: userID });
            if (blacklistDB) {
                return blacklistDB;
            } else {
                return "User is not blacklisted.";
            };
        };

        module.exports.getGuildDB = async function (guildID) {
            let guildDB = await guildsDB.findOne({ guildID: guildID });
            if (guildDB) {
                return guildDB;
            } else {
                return "Guild isn't set up with bot.";
            };
        };

        module.exports.getInventoryDB = async function (userID) {
            let inventoryDB = await inventoriesDB.findOne({ userID: userID });
            if (inventoryDB) {
                return inventoryDB;
            } else {
                return "User doesn't have an inventory.";
            };
        };

        module.exports.getReadyatDB = async function () {
            let readyat = await readyatDB.findOne({ timezone: 'PST/Pacific Standard Time' });
            if (readyat) {
                return readyat;
            } else {
                return "No existing time.";
            };
        };
    },
};