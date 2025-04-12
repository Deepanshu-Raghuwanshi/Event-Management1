// server.js
import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the server
const server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// Get path to db.json
const dbPath = join(__dirname, "db.json");

// Check if db.json exists
if (!fs.existsSync(dbPath)) {
  console.error(`Error: ${dbPath} does not exist`);
  process.exit(1);
}

// Set up JSON Server router using db.json
const router = jsonServer.router(dbPath);
server.use(router);

// Define port
const PORT = process.env.PORT || 3001;

// Start server
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
  console.log(`Serving data from ${dbPath}`);
});
