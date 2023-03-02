"use strict"

//@ts-check

const path = require("path");
const fs = require("fs");
const prettier = require("prettier");
const figlet = require("figlet");
//const { Chalk } = require("chalk");

const WORKING_DIR = path.basename(process.cwd());
//const chalk = new Chalk();

console.clear();

console.log(
    figlet.textSync("SimpleModBot", { horizontalLayout: "full" })
);

if (fs.existsSync(`${WORKING_DIR}/settings.json`)) {
    console.log(`
    settings.json already exists.\n
    please 
    `);
}