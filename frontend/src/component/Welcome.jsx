import React from "react";
import '../styles/Welcome.css';

export default function Welcome({ handleStart, onShowLeaderboard }) {
    return (
        <div className="welcome-container">
            <div className="stars"></div>
            <div className="twinkling"></div>
            
            <div className="welcome-content">
                <div className="planet-animation">
                    <div className="planet">
                        <div className="ring"></div>
                        <div className="surface"></div>
                    </div>
                    <div className="astronaut">
                        <div className="astronaut-body"></div>
                        <div className="astronaut-pack"></div>
                        <div className="astronaut-helmet"></div>
                    </div>
                </div>

                <h1 className="welcome-title">
                    <span className="title-emoji">🚀</span>
                    Space Explorer
                    <span className="title-emoji">🌎</span>
                </h1>

                <div className="welcome-description">
                    <p>Embark on an epic journey through the cosmos!</p>
                    <p>Explore planets, solve mysteries, and become a legendary space explorer.</p>
                </div>

                <div className="button-container">
                    <button 
                        onClick={handleStart}
                        className="start-adventure-btn"
                    >
                        Start Adventure! 
                        <span className="button-emoji">🌟</span>
                    </button>
                    
                    <button 
                        onClick={onShowLeaderboard}
                        className="leaderboard-btn"
                    >
                        View Hall of Fame 
                        <span className="button-emoji">🏆</span>
                    </button>
                </div>

                <div className="feature-grid">
                    <div className="feature-item">
                        <span className="feature-icon">🌍</span>
                        <h3>Explore Planets</h3>
                        <p>Visit amazing worlds</p>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">🧪</span>
                        <h3>Conduct Research</h3>
                        <p>Make discoveries</p>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">⭐</span>
                        <h3>Earn Points</h3>
                        <p>Become a legend</p>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">🎯</span>
                        <h3>Complete Missions</h3>
                        <p>Face challenges</p>
                    </div>
                </div>

                <div className="floating-elements">
                    <span className="float-item">🌠</span>
                    <span className="float-item">🪐</span>
                    <span className="float-item">☄️</span>
                    <span className="float-item">🌍</span>
                    <span className="float-item">🚀</span>
                </div>
            </div>
        </div>
    );
}
