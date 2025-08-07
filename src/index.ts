#!/usr/bin/env node

import { checkEnvFiles } from "./command/check.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');
import { createExampleFromEnv, prepareEnvFromExample } from "./command/generate.js";
import { listEnvKeys } from "./command/list.js";

function showHelp() {
    console.log(`
envsafe-cli - Validate and manage your .env files

Usage:
  envsafe-cli                 Compare .env and .env.example
  envsafe-cli --init          Generate .env.example from .env
  envsafe-cli --prepare       Create .env from .env.example
      --fill=<value>          (optional) Fill values in .env (default is empty)
      --force                 Overwrite if file exists
  envsafe-cli --list[=<file>] List env keys (defaults to .env)
      --with-values           Show values too
  envsafe-cli --version       Show CLI version
  envsafe-cli --help          Show help
  `);
}

function main() {
    const args = process.argv.slice(2);

    if (args.includes('--help')) {
        showHelp();
        return;
    }

    if (args.includes('--version')) {
        console.log(`envsafe-cli version ${pkg.version}`);
        return;
    }

    if (args.includes('--init')) {
        createExampleFromEnv();
        return;
    }

    if (args.includes('--prepare')) {
        const fillArg = args.find(arg => arg.startsWith('--fill='));
        const fillWith = fillArg ? fillArg.split('=')[1] : '';
        prepareEnvFromExample(args.includes('--force'), fillWith);
        return;
    }

    if (args.some(arg => arg.startsWith('--list'))) {
        const fileArg = args.find(arg => arg.startsWith('--list='));
        const file = fileArg ? fileArg.split('=')[1] : '.env';
        const withValues = args.includes('--with-values');

        if (!file) {
            console.error("Missing --file option");
            process.exit(1);
        }

        listEnvKeys({ file, withValues });
        return;
    }

    checkEnvFiles();
}

main();