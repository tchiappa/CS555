import Leaderboard from '../models/Leaderboard.js';

// Get top players with optional time filter
export const getTopPlayers = async (req, res) => {
  try {
    const { timeFilter = 'all' } = req.query;
    let query = {};
    
    // Apply time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (timeFilter) {
        case 'weekly':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'monthly':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          startDate = new Date(0); // All time
      }
      
      query.lastUpdated = { $gte: startDate };
    }

    console.log('Fetching leaderboard with query:', query); // Debug log
    const topPlayers = await Leaderboard.find(query)
      .sort({ score: -1 })
      .limit(100)
      .select('playerName score fuelEfficiency scientificAchievements missionsCompleted planetsExplored lastUpdated');

    console.log('Found players:', topPlayers); // Debug log
    res.json(topPlayers);
  } catch (error) {
    console.error('Error in getTopPlayers:', error); // Debug log
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
};

// Update player score
export const updatePlayerScore = async (req, res) => {
  try {
    const { playerId, playerName, score, fuelEfficiency, scientificAchievements, missionsCompleted, planetsExplored } = req.body;
    console.log('Updating player score:', req.body); // Debug log

    const updatedScore = await Leaderboard.findOneAndUpdate(
      { playerId },
      {
        playerName,
        score,
        fuelEfficiency,
        scientificAchievements,
        missionsCompleted,
        planetsExplored,
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );

    console.log('Updated score:', updatedScore); // Debug log
    res.json(updatedScore);
  } catch (error) {
    console.error('Error in updatePlayerScore:', error); // Debug log
    res.status(500).json({ message: 'Error updating score', error: error.message });
  }
};

// Get player rank
export const getPlayerRank = async (req, res) => {
  try {
    const { playerId } = req.params;
    console.log('Getting rank for player:', playerId); // Debug log
    
    const player = await Leaderboard.findOne({ playerId });
    if (!player) {
      console.log('Player not found:', playerId); // Debug log
      return res.status(404).json({ message: 'Player not found' });
    }

    const rank = await Leaderboard.countDocuments({ score: { $gt: player.score } }) + 1;
    console.log('Player rank:', rank); // Debug log
    
    res.json({
      rank,
      player: {
        playerName: player.playerName,
        score: player.score,
        fuelEfficiency: player.fuelEfficiency,
        scientificAchievements: player.scientificAchievements,
        missionsCompleted: player.missionsCompleted,
        planetsExplored: player.planetsExplored
      }
    });
  } catch (error) {
    console.error('Error in getPlayerRank:', error); // Debug log
    res.status(500).json({ message: 'Error getting player rank', error: error.message });
  }
}; 