import express from 'express';
import { getTopPlayers, updatePlayerScore, getPlayerRank } from '../controllers/leaderboardController.js';

const router = express.Router();

// Get top players with optional time filter
router.get('/top', getTopPlayers);

// Update player score
router.post('/update', updatePlayerScore);

// Get player rank
router.get('/rank/:playerId', getPlayerRank);

export default router; 