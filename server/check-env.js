import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
console.log("Server .env loaded. Key:", process.env.OPENROUTER_API_KEY ? "YES" : "NO");

const rootPath = path.resolve(__dirname, '../.env');
console.log("Loading root .env from:", rootPath);
dotenv.config({ path: rootPath });
console.log("Root .env loaded. Key:", process.env.OPENROUTER_API_KEY ? "YES" : "NO");
