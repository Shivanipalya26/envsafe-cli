import fs from 'fs';
import path from 'path';

export function fileExists(filepath: string): boolean {
    return fs.existsSync(filepath);
}

export function parseEnvFile(filepath: string): Record<string, string> {
    const absPath = path.resolve(filepath);

    if(!fs.existsSync(absPath)) {
        throw new Error(`File not found: ${absPath}`);
    }

    const content = fs.readFileSync(absPath, 'utf-8');

    const lines = content.split('\n');

    const result: Record<string, string> = {};

    for (let line of lines) {
        line = line.trim();

        if(!line || line.startsWith('#')) continue;

        const [key, ...rest] = line.split('=');
        const value = rest.join('=').trim();

        if(key) {
            result[key.trim()] = value.replace(/^"(.*)"$/, '$1');
        }
    }

    return result;
}