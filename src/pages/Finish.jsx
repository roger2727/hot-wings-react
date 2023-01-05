import { useState, useEffect } from "react";
import "./Finish.css";
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
    <div className="finish-box">
      <div class="wrapper">
        <h2 className="winner">Winner!</h2>
        <div class="glow"></div>
        <div class="mask">
          <div class="btn-box">
            <a class="btn" href="./index.html">
              Play Again
            </a>
          </div>
          <div class="finish-container">
            <div class="star">&#10022;</div>
            <div class="finish-main">
              <p className="trophy-label">
                <p>{playerWithHighestScore}</p>
              </p>
            </div>
            <div class="stem1"></div>
            <div class="stemCrease"></div>
            <div class="stem2"></div>
            <div class="base"></div>

            <div class="arms"></div>
          </div>
        </div>
        <div className="results-page">
          <h2>Results</h2>
          {playerNames &&
            playerNames.map((playerName) => (
              <p key={playerName}>
                {playerName}: {scores[playerName]}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Finish;
