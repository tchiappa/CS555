import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [playerName, setPlayerName] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      login(playerName);
      onLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <div className="login-card">
        <div className="rocket-container">
          <div className="rocket">
            <div className="rocket-body">
              <div className="window"></div>
            </div>
            <div className="fins">
              <div className="fin"></div>
              <div className="fin"></div>
              <div className="fin"></div>
            </div>
            <div className="exhaust-flame"></div>
          </div>
        </div>

        <h1 className="login-title">
          <span className="planet-emoji">🚀</span>
          Space Explorer
          <span className="planet-emoji">🌎</span>
        </h1>
        
        <p className="welcome-text">
          Ready for an amazing space adventure? Enter your name to begin!
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your astronaut name"
              className="name-input"
              maxLength={20}
              required
            />
          </div>
          <button type="submit" className="start-button">
            Launch Mission! 🌟
          </button>
        </form>

        <div className="floating-objects">
          <span className="floating-item">🌟</span>
          <span className="floating-item">🪐</span>
          <span className="floating-item">☄️</span>
          <span className="floating-item">🌍</span>
          <span className="floating-item">🌠</span>
        </div>
      </div>
    </div>
  );
};

export default Login; 