import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverEnv = path.join(__dirname, '.env');
const rootEnv = path.resolve(__dirname, '../.env');

function inspectRequest(filePath) {
    console.log(`--- Inspecting ${filePath} ---`);
    if (!fs.existsSync(filePath)) {
        console.log("File does NOT exist.");
        return;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log("Length:", content.length);
    console.log("Raw Content (First 100 chars):");
    console.log(JSON.stringify(content.substring(0, 100)));

    // Check for specific key
    if (content.includes("OPENROUTER_API_KEY")) {
        console.log("Found 'OPENROUTER_API_KEY' string in file.");
    } else {
        console.log("Did NOT find 'OPENROUTER_API_KEY' string in file.");
    }
}

inspectRequest(serverEnv);
inspectRequest(rootEnv);
