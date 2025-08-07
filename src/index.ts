#!/usr/bin/env node

import { checkEnvFiles } from "./command/check.js";

function main() {
    try {
        checkEnvFiles();
    } catch (error) {
        console.error('Error: ', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

main();