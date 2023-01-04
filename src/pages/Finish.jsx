import { useState, useEffect } from "react";

function Finish() {
  const [scores, setScores] = useState({});

  useEffect(() => {
    // Get the scores from session storage
    const scoresFromStorage = JSON.parse(
      window.sessionStorage.getItem("scores")
    );
    setScores(scoresFromStorage);
  }, []); // Only run the effect once

  // Get the names of the players
  let playerNames;
  let highestScore = 0;
  let playerWithHighestScore = "";

  if (scores) {
    playerNames = Object.keys(scores);
    highestScore = Math.max(...Object.values(scores));
    playerWithHighestScore = playerNames.find(
      (name) => scores[name] === highestScore
    );
  }

  return (
    <div className="box">
      <h2>Results</h2>
      {playerNames &&
        playerNames.map((playerName) => (
          <p key={playerName}>
            {playerName}: {scores[playerName]}
          </p>
        ))}
      <h2>Winner</h2>
      <p>
        {playerWithHighestScore}: {highestScore}
      </p>
    </div>
  );
}

export default Finish;
