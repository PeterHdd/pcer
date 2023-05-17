import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import { add, get } from "./add.js";
import { alias, list, remove } from "./alias.js";
import { utils } from "./util/util.js";

const program = new Command();


export default (inputarg) => {
    init();
}

function init() {
    if (process.argv.length < 3 || process.argv[2] == "--help") {
        console.log(chalk.yellow(figlet.textSync('PCER', { horizontalLayout: 'full' })));
    }

    program
        .name(`${chalk.blueBright("pcer")}`)
        .usage(`${chalk.blueBright("<command> [<args>] [--help]")}`)
        .version(`${utils.version}`, '-v, --version', 'output the current version');

    //add
    program.command("add <cert>")
        .description('Add a certificate into the specified location')
        .requiredOption('-l, --location <location>', 'certificate to save')
        .action(add);

    //alias
    program.command("alias <name>")
        .description('Add a alias to the specified location')
        .argument("<location>", "Add the location")
        .action(alias);

    //list
    program.command("list")
        .description('list all alias')
        .action(list);

    //remove
    program.command("remove")
        .argument('[alias]')
        .description('alias to be removed')
        .option('-a,--all', 'removes all alias')
        .action(remove);

    //fetch
    program.command("fetch <url>")
        .description('fetch a SSL certificate, url should be of format, ex: example.com')
        .requiredOption('-l, --location <location>', 'certificate to save')
        .action(get);

    program.parse(process.argv);

}