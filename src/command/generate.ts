import fs from "fs";
import path from "path";

export function createExampleFromEnv(force = false) {
    const input = '.env';
    const output = '.env.example';

    const inputPath = path.resolve(process.cwd(), input);
    const outputPath = path.resolve(process.cwd(), output);

    if (!fs.existsSync(inputPath)) {
        if (process.env.CI) {
            console.warn(`⚠️  ${input} not found, skipping in CI...`);
            return;
        }
        console.error(`${input} not found`);
        process.exit(1);
    }

    if (fs.existsSync(outputPath) && !force) {
        console.error(`${output} already exists.`);
        process.exit(1);
    }

    const envContent = fs.readFileSync(inputPath, 'utf-8');
    const exampleLines = envContent.split('\n').map(line => {
        if (line.trim().startsWith('#') || line.trim() === '') {
            return line;
        }
        const [key] = line.split('=');
        return `${key}=`;
    });

    fs.writeFileSync(outputPath, exampleLines.join('\n'), 'utf-8');
    console.log(`${output} generated from ${input}`);
}

export function prepareEnvFromExample(force = false, fillWith = '') {
    const input = '.env.example';
    const output = '.env';
    const inputPath = path.resolve(process.cwd(), input);
    const outputPath = path.resolve(process.cwd(), output);

    if (!fs.existsSync(inputPath)) {
        console.error(`Input file ${input} not found.`);
        process.exit(1);
    }

    if (fs.existsSync(outputPath) && !force) {
        console.error(`Output file ${output} already exists. Use --force to overwrite.`);
        process.exit(1);
    }

    const content = fs.readFileSync(inputPath, 'utf-8');
    const lines = content.split('\n').map(line => {
        const trimmed = line.trim();
        if (trimmed === '' || trimmed.startsWith('#')) {
            return line;
        }

        const [key] = line.split('=');
        return `${key}=${fillWith}`;
    });

    fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
    console.log(`${output} created from ${input}`);
}