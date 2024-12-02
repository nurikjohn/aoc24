#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

const day = process.argv[2];
const part = process.argv[3];

if (!day || !part) {
    console.error('Usage: npm run start <day> <part>');
    process.exit(1);
}

const scriptPath = path.join(__dirname, `day-${day}`, `part-${part}.ts`);

if (!fs.existsSync(scriptPath)) {
    console.error(`Script not found: ${scriptPath}`);
    process.exit(1);
}

const child = spawn('ts-node', [scriptPath], { stdio: 'inherit' });

child.on('error', (error) => {
    console.error(`Execution error: ${error}`);
    process.exit(1);
});
