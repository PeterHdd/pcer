import chalk from "chalk";
import Configstore from 'configstore';
import inquirer from 'inquirer';
import { utils } from "./util/util.js";


export const config = new Configstore(utils.name);


export const alias = (name, location) => {
    if (config.get(name)) {
        inquirer
            .prompt([
                {
                    name: "confirm",
                    type: "confirm",
                    message: "Alias already exists, are you sure you want to create an alias with this name?"
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
    if (Object.keys(config.all).length === 0) {
        console.log(`${chalk.redBright("List is Empty")}`)
    }
    for (const [key, value] of Object.entries(config.all)) {
        console.log(`${key} ----> ${chalk.green(value)}`);
    }
}

export const remove = (alias) => {
    config.delete(alias);
    console.log(chalk.green("Successfully deleted alias"));
}
