import chalk from "chalk";
import Configstore from 'configstore';
import { readFileSync } from "fs";
import inquirer from 'inquirer';



const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
export const config = new Configstore(packageJson.name);


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
    if (config.all == null) {
        console.log(`${chalk.green("List is Empty")}`)
    }
    for (const [key, value] of Object.entries(config.all)) {
        console.log(`${key} ----> ${chalk.green(value)}`);
    }
}

export const remove = (alias) => {
    config.delete(alias);
    console.log(chalk.green("Successfully deleted alias"));
}
