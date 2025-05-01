import Entry from '../models/LeaderboardEntry.js';

export async function createEntry(req, res) {
  try {
    const doc = await Entry.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTop(req, res) {
  const { filter = 'all' } = req.query;
  const match = {};
  const now   = Date.now();
  if (filter === 'weekly')  match.createdAt = { $gte: new Date(now - 7*24*60*60*1e3) };
  if (filter === 'monthly') match.createdAt = { $gte: new Date(now - 30*24*60*60*1e3) };

  try {
    const rows = await Entry.find(match).sort({ totalScore: -1 }).limit(50).lean();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
