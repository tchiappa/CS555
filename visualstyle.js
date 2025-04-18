<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Space Explorer Game</title>
  <style>
    :root {
      --primary-color: #4d90fe;
      --secondary-color: #1c1c3c;
      --accent-color: #ffe156;
      --font-family: 'Comic Sans MS', cursive, sans-serif;
      --button-radius: 12px;
    }

    body {
      margin: 0;
      font-family: var(--font-family);
      background: linear-gradient(to bottom, #000011, #1a1a40);
      color: white;
      text-align: center;
    }

    .game-header {
      padding: 20px;
      font-size: 2rem;
      color: var(--accent-color);
      text-shadow: 2px 2px 4px #000;
    }

    .space-button {
      background-color: var(--primary-color);
      color: white;
      padding: 12px 24px;
      margin: 10px;
      border: none;
      border-radius: var(--button-radius);
      font-size: 1.2rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .space-button:hover {
      background-color: #3a6edc;
    }

    .planet-menu {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
    }

    .planet-icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: var(--accent-color);
      box-shadow: 0 0 15px var(--accent-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .planet-icon:hover {
      transform: scale(1.1);
    }

    .score-display {
      background-color: var(--secondary-color);
      padding: 15px;
      border-radius: 10px;
      margin: 20px auto;
      width: 200px;
      font-size: 1.2rem;
    }
  </style>
</head>
<body>
  <div class="game-header">🌌 Space Explorer</div>

  <div class="planet-menu">
    <div class="planet-icon">🌍</div>
    <div class="planet-icon">🪐</div>
    <div class="planet-icon">🌕</div>
  </div>

  <button class="space-button" onclick="startQuiz()">Start Quiz</button>

  <div class="score-display" id="scoreDisplay">Score: 0</div>

  <script>
    let score = 0;

    function startQuiz() {
      score += 10;
      document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
      alert("Quiz started! (This is a placeholder)");
    }
  </script>
</body>
</html>
