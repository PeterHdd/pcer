import chalk from "chalk";
import Configstore from 'configstore';
import inquirer from 'inquirer';
import { utils } from "./util/util.js";
import { table } from "table";
import { Command } from "commander";



const program = new Command();
export const config = new Configstore(utils.name);


export const alias = (name, location) => {
    if (config.get(name)) {
        inquirer
            .prompt([
                {
                    name: "confirm",
                    type: "confirm",
                    message: "Alias already exists, are you sure you want to overwrite an alias with this name?"
                }
            ])
            .then((answers) => {
                if (answers.confirm) {
                    setAlias(name, location);
                }
            })
            .catch((error) => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else went wrong
                }
            });
    }
    else {
        setAlias(name, location);
    }
}

function setAlias(name, location) {
    config.set(name, location);
    console.log(chalk.green("Successfully added alias"));
}


export const list = () => {
    let data = [];
    if (!config.size) {
        program.error(`${chalk.redBright("List is Empty")}`)
    }
    for (const [key, value] of Object.entries(config.all).sort()) {
        data.push([key, chalk.greenBright(value)]);
    }
    console.log(table(data));
}

export const remove = (alias, option) => {
    if (alias && option.all) {
        program.error(chalk.redBright("Invalid command, use 'pcer remove --all' or 'pcer remove <alias>'"));
    }
    if (alias) {
        if (config.has(alias)) {
            config.delete(alias);
            console.log(chalk.green("Successfully deleted alias"));
        } else {
            console.log(chalk.redBright("Alias doesn't exist"));
        }
    }
    else {
        config.clear();
        console.log(chalk.green("Successfully deleted all aliases"));
    }
}
