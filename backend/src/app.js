// backend/src/app.js
import express from 'express';
import dotenv  from 'dotenv';
import cors    from 'cors';

import leaderboardRouter from './routes/leaderboard.js';  // ← you created this in step 1.2

dotenv.config();

const app = express();

/* ────── global middleware ────── */
app.use(cors());                 // allow requests from Vite dev server
app.use(express.json());         // parse application/json bodies
app.use(express.urlencoded({ extended: false }));

/* ────── API routes ────── */
app.use('/api/leaderboard', leaderboardRouter);

/* ────── health-check (optional) ────── */
app.get('/api/ping', (_, res) => res.send('pong 🏓'));

/* ────── 404 fall-through ────── */
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

export default app;
