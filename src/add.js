import { Command } from "commander";
import { readFile, writeFile } from 'node:fs';
import path from "node:path";
import chalk from "chalk";
import { config } from "./alias.js";



const program = new Command();
const arr = [".pem", ".crt", ".cer"];

export const add = (filePath, options) => {
    let location = options.location;
    if (config.get(location)) {
        location = config.get(location);
    }
    if (arr.indexOf(path.extname(filePath)) > -1) {
        readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            writeFile(location, `\n${data}`, { 'flag': 'a' }, (err) => {
                if (err) {
                    program.error(chalk.redBright('Writing to the file requires Administration access'), { exitCode: 2, code: 'my.custom.error' });
                }
                else {
                    console.log(chalk.green('Certificate added successfully'))
                }
            });
        });
    }

}