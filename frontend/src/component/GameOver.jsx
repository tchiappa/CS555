import React from 'react';

export default function GameOver({ score, onPlayAgain }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Game Over</h1>
      {score !== undefined && <p style={styles.score}>Your Score: {score}</p>}
      <button style={styles.button} onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
    color: '#333',
  },
  score: {
    fontSize: '24px',
    marginBottom: '40px',
    color: '#666',
  },
  button: {
    fontSize: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  }
};

