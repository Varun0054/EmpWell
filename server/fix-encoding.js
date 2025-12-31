import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootEnvPath = path.resolve(__dirname, '../.env');

try {
    console.log(`Reading ${rootEnvPath}...`);
    // Read raw buffer
    const buffer = fs.readFileSync(rootEnvPath);

    // Check for BOM (FF FE) which indicates UTF-16LE
    if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
        console.log("Detected UTF-16LE BOM. Converting to UTF-8...");

        // Convert buffer to string assuming utf16le
        const content = buffer.toString('utf16le');

        // Write back as utf8
        fs.writeFileSync(rootEnvPath, content, 'utf8');
        console.log("Conversion successful!");
    } else {
        console.log("File does not appear to be UTF-16LE (No BOM).");
        // It might be UTF-16LE without BOM or something else, but let's see.
        // The previous tool output showed the BOM characters "", so it should catch it.
    }

} catch (err) {
    console.error("Error converting file:", err);
}
