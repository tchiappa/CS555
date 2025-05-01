import { Router } from 'express';
import { createEntry, getTop } from '../controllers/leaderboardController.js';

const router = Router();
router.post('/',  createEntry);
router.get('/',   getTop);

export default router;
