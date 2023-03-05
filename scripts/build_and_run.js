"use strict";
//@ts-check

const figlet = require("figlet");
const chalk = require("chalk");
const child_process = require("child_process");
const what_doing = Number(process.argv[2]);

(async () => {
    if (what_doing == 0) {
        //normal build + run
        const b_r = child_process.exec("tsc", "--build");

        b_r.on('spawn', () => {
            process.stdout.write(`${chalk.greenBright(`=> Successfully spawned tsc:\n\t${chalk.white("pid:")} ${chalk.blue(b_r.pid)}\n\t${chalk.white("parameters:")} ${chalk.blue(b_r.spawnargs)}`)}`)
        });

        b_r.on('message', (msg) => {
            process.stdout.write(msg);
        });

        b_r.on('error', (err) => {
            process.stdout.write(``)
        });
    }
})();