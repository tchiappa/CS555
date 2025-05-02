import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/leaderboard", leaderboardRoutes);

export default app;
