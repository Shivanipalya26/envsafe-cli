import fs from "fs";
import path from "path";

interface ListOptions {
    file: string;
    withValues?: boolean;
}

export function listEnvKeys(options: ListOptions) {
    const filePath = path.resolve(process.cwd(), options.file);

    if (!fs.existsSync(filePath)) {
        console.error(`${options.file} not found`);
        process.exit(1);
    }

    const content = fs.readFileSync(filePath, "utf-8");

    const keys: string[] = [];
    const lines = content.split("\n");

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed === "") continue;

        const [key, ...rest] = trimmed.split("=");

        if (options.withValues) {
            keys.push(`${key}=${rest.join("=")}`);
        } else {
            keys.push(key as string);
        }
    }

    if (keys.length === 0) {
        console.log(`No keys found in ${options.file}`);
    } else {
        console.log(`Keys in ${options.file}:`);
        for (const key of keys) {
            console.log("  -", key);
        }
    }
}

export function testEnvKeys(options: ListOptions): string[] {
    const filePath = path.resolve(process.cwd(), options.file);

    if (!fs.existsSync(filePath)) {
        throw new Error(`${options.file} not found`);
    }

    const content = fs.readFileSync(filePath, "utf-8");

    return content
        .split("\n")
        .map(line => line.trim())
        .filter(line => line && !line.startsWith("#")) 
        .map(line => {
            const [key, ...rest] = line.split("=");
            if (!key) return "";
            return options.withValues ? `${key}=${rest.join("=")}` : key;
        });
}