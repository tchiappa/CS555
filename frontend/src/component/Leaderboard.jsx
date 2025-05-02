import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Leaderboard.css';

const Leaderboard = ({ onBack }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [playerRank, setPlayerRank] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
    if (user && user.id !== 'guest') {
      fetchPlayerRank();
    }
  }, [timeFilter, user]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching leaderboard data...'); // Debug log
      const response = await axios.get(`http://localhost:4000/api/leaderboard/top?timeFilter=${timeFilter}`);
      console.log('Leaderboard data:', response.data); // Debug log
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError('Failed to load leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayerRank = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/leaderboard/rank/${user.id}`);
      setPlayerRank(response.data);
    } catch (error) {
      console.error('Error fetching player rank:', error);
    }
  };

  const shareRanking = () => {
    if (playerRank) {
      const shareText = `I'm ranked #${playerRank.rank} on the Space Explorer leaderboard! Can you beat my score?`;
      if (navigator.share) {
        navigator.share({
          title: 'Space Explorer Leaderboard',
          text: shareText,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Ranking copied to clipboard!');
      }
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <h2>Loading leaderboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchLeaderboard} className="share-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Leaderboard</h2>
        <button onClick={onBack} className="back-button">
          Back to Game
        </button>
      </div>
      
      <div className="filter-container">
        <select 
          value={timeFilter} 
          onChange={(e) => setTimeFilter(e.target.value)}
          className="time-filter"
        >
          <option value="all">All Time</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
        </select>
      </div>

      {playerRank && (
        <div className="player-rank">
          <h3>Your Rank: #{playerRank.rank}</h3>
          <button onClick={shareRanking} className="share-button">
            Share Your Ranking
          </button>
        </div>
      )}

      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
              <th>Fuel Efficiency</th>
              <th>Scientific Achievements</th>
              <th>Missions Completed</th>
              <th>Planets Explored</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(players) && players.length > 0 ? (
              players.map((player, index) => (
                <tr key={player._id} className={user && player.playerId === user.id ? 'current-player' : ''}>
                  <td>{index + 1}</td>
                  <td>{player.playerName}</td>
                  <td>{player.score}</td>
                  <td>{player.fuelEfficiency}%</td>
                  <td>{player.scientificAchievements}</td>
                  <td>{player.missionsCompleted}</td>
                  <td>{player.planetsExplored?.length || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard; 