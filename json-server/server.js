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

// Check if we're in a read-only environment (like Vercel)
const isVercel = process.env.VERCEL === "1";
let router;

if (isVercel) {
  // Use in-memory database for Vercel
  console.log("Running on Vercel, using in-memory database");

  // Load initial data from db.json
  const dbPath = join(__dirname, "db.json");
  let initialData = {};

  try {
    const rawData = fs.readFileSync(dbPath, "utf8");
    initialData = JSON.parse(rawData);
    console.log("Loaded initial data from db.json");
  } catch (error) {
    console.error("Error loading initial data:", error);
    // Provide fallback data if db.json can't be read
    initialData = {
      users: [
        {
          id: 1,
          username: "user1",
          email: "user1@example.com",
          password: "password123",
        },
      ],
      events: [
        {
          id: 1,
          title: "Tech Conference 2023",
          description:
            "Annual technology conference featuring the latest innovations",
          date: "2023-12-15",
          time: "09:00",
          location: "Convention Center",
          userId: 1,
        },
      ],
    };
    console.log("Using fallback data");
  }

  // Create router with in-memory data
  router = jsonServer.router(initialData);
} else {
  // Use file-based database for local development
  const dbPath = join(__dirname, "db.json");

  // Check if db.json exists
  if (!fs.existsSync(dbPath)) {
    console.error(`Error: ${dbPath} does not exist`);
    process.exit(1);
  }

  // Set up JSON Server router using db.json
  router = jsonServer.router(dbPath);
  console.log(`Serving data from ${dbPath}`);
}

// Use the router
server.use(router);

// Define port
const PORT = process.env.PORT || 3001;

// Start server
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
