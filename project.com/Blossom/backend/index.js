import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { initializeDatabase } from "./lib/db.js";
import { initializeRoutes } from "./routes/index.js";
import path from 'path';
import { fileURLToPath } from 'url'; 

const app = express();
const __filename = fileURLToPath(import.meta.url); // Define __filename equivalent
const __dirname = path.dirname(__filename);


app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));


dotenv.config();

const PORT = process.env.PORT ?? 8086;

/**
 * Intialising routes
 */
initializeRoutes(app);

/**
 * Intialising Database
 */
initializeDatabase();

/**
 * Listening to server
 */
app.listen(PORT, () => console.log("Listening on port", PORT));

app.get("*", (req, res) => {
    res.sendFile(path.join(path.join(__dirname, 'dist'), 'index.html'));
});

