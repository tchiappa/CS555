import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema({
  playerName:   { type: String, required: true },
  totalScore:   { type: Number, required: true },
  missions:     { type: [String], default: [] },
  fuel:         { type: Number, default: 0 },
  createdAt:    { type: Date,    default: Date.now }
});

/*  the variable name here must match the one above  */
export default model('LeaderboardEntry', leaderboardEntrySchema);
