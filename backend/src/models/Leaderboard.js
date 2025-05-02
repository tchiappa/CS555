import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true
  },
  playerName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  fuelEfficiency: {
    type: Number,
    required: true
  },
  scientificAchievements: {
    type: Number,
    required: true
  },
  missionsCompleted: {
    type: Number,
    required: true
  },
  planetsExplored: {
    type: [String],
    default: []
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
leaderboardSchema.index({ score: -1 });
leaderboardSchema.index({ lastUpdated: -1 });

export default mongoose.model('Leaderboard', leaderboardSchema); 