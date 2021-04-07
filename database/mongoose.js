const mongoose = require('mongoose');
require('dotenv').config();
const timestamp = require('console-timestamp');
const now = new Date();
const number = 478921;

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(`mongodb+srv://DEATHB4DEFEAT:${process.env.PASS}@cluster0.vzyir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('[hh:mm:ss]'.timestamp + ` I have connected to the database succesfully!`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('[hh:mm:ss]'.timestamp + ` I have disconnected from the database!`);
        });

        mongoose.connection.on('err', (err) => {
            console.log('[hh:mm:ss]'.timestamp + ' There was an error with the connection to the database: ' + err);
        });
    }
}