import { fileExists, parseEnvFile } from "../utils/file.js";

export function checkEnvFiles(): void {
    const envPath = '.env';
    const examplePath = '.env.example';

    if(!fileExists(envPath)) {
        console.error(`${envPath} not found`);
        process.exit(1);
    }

    if(!fileExists(examplePath)) {
        console.error(`${examplePath} not found`);
        process.exit(1);
    }

    const envVars = parseEnvFile(envPath);
    const exampleVars = parseEnvFile(examplePath);

    const envKeys = Object.keys(envVars);
    const exampleKeys = Object.keys(exampleVars);

    const missingKeys = exampleKeys.filter((key) => !envKeys.includes(key));
    const extraKeys = envKeys.filter((key) => !exampleKeys.includes(key));

    if(missingKeys.length === 0 && extraKeys.length === 0) {
        console.log("All keys match between .env and .env.example");
        process.exit(0);
    }

    if(missingKeys.length > 0) {
        console.warn('\n Missing keys in .env: ');
        missingKeys.forEach((key) => console.warn(` - ${key}`));
    }

    if(extraKeys.length > 0) {
        console.warn('\n Extra keys in .env not in .env.example: ');
        extraKeys.forEach((key) => console.warn(` - ${key}`));
    }

    process.exit(1);
}