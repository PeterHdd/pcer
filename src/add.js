import { Command } from "commander";
import { readFile, writeFile } from 'node:fs';
import path from "node:path";
import chalk from "chalk";
import { config } from "./alias.js";
import https from "node:https"



const program = new Command();
const arr = [".pem", ".crt", ".cer"];

export const add = (filePath, options) => {
    let location = checkConfig(options);
    if (arr.indexOf(path.extname(filePath)) > -1) {
        readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            writeToFile(location, data);
        });
    }
}

function checkConfig(options) {
    let location = options.location;
    if (config.get(location)) {
        location = config.get(location);
    }
    return location;
}

function writeToFile(location, data) {
    writeFile(location, `\n${data}`, { 'flag': 'a' }, (err) => {
        if (err) {
            program.error(chalk.redBright('Writing to the file requires Administration access'), { exitCode: 2, code: 'my.custom.error' });
        }
        else {
            console.log(chalk.green('Certificate added successfully'))
        }
    });

}

export const get = (url, options) => {

    let location = checkConfig(options);

    var options = {
        hostname: url,
        port: 443,
        method: 'GET',
        rejectUnauthorized: false
    };

    var req = https.request(options, (res) => {
        var name = `# ${url}\n`
        var prefix = '-----BEGIN CERTIFICATE-----\n';
        var postfix = '-----END CERTIFICATE-----';
        var pemText = `${name} ${prefix} ${res.socket.getPeerCertificate().raw.toString('base64').match(/.{0,64}/g).join('\n')} ${postfix}`;
        writeToFile(location, pemText);

    }).on('error', (e) => {
        console.error(e);
    });
    req.end();
}