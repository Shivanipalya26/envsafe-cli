#!/usr/bin/env node

import { checkEnvFiles } from "./command/check.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

import { createExampleFromEnv, prepareEnvFromExample } from "./command/generate.js";
import { listEnvKeys } from "./command/list.js";

import chalk from "chalk";
import figures from "figures";
import boxen from "boxen";

function showHelp() {
  const usage = `
${chalk.bold(pkg.name)} - ${chalk.magenta("Validate and manage your .env files")}

${chalk.bold("Usage:")}
  ${chalk.green("envsafe-cli")}                 Compare .env and .env.example
  ${chalk.green("envsafe-cli --init")}          Generate .env.example from .env
  ${chalk.green("envsafe-cli --prepare")}       Create .env from .env.example
    ${chalk.gray("--fill=<value>")}            (optional) Fill values in .env (default is empty)
    ${chalk.gray("--force")}                   Overwrite if file exists
  ${chalk.green("envsafe-cli --list[=<file>]")} List env keys (defaults to .env)
    ${chalk.gray("--with-values")}             Show values too
  ${chalk.green("envsafe-cli --version")}       Show CLI version
  ${chalk.green("envsafe-cli --help")}          Show help
`;

  console.log(
    boxen(usage, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "green",
    })
  );
}

function logError(msg: string) {
    console.error(chalk.red(`${figures.cross} ${msg}`));
}

function logSuccess(msg: string) {
    console.log(chalk.green(`${figures.tick} ${msg}`));
}

function main() {
    const args = process.argv.slice(2);

    if (args.includes('--help')) {
        showHelp();
        return;
    }

    if (args.includes('--version')) {
        logSuccess(`envsafe-cli version ${pkg.version}`);
        return;
    }

    if (args.includes('--init')) {
        createExampleFromEnv();
        logSuccess(`.env.example created from .env`);
        return;
    }

    if (args.includes('--prepare')) {
        const fillArg = args.find(arg => arg.startsWith('--fill='));
        const fillWith = fillArg ? fillArg.split('=')[1] : '';
        prepareEnvFromExample(args.includes('--force'), fillWith);
        logSuccess(`.env file created from .env.example`);
        return;
    }

    if (args.some(arg => arg.startsWith('--list'))) {
        const fileArg = args.find(arg => arg.startsWith('--list='));
        const file = fileArg ? fileArg.split('=')[1] : '.env';
        const withValues = args.includes('--with-values');

        if (!file) {
            logError("Missing --file option");
            process.exit(1);
        }

        listEnvKeys({ file, withValues });
        return;
    }

    checkEnvFiles();
}

main();