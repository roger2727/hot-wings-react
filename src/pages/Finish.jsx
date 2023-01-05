import { useState, useEffect } from "react";
import "./Finish.css";
import { Link } from "react-router-dom";
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
        <div class="glow"></div>
        <div class="mask">
          <div class="btn-box">
            <div className="results-page">
              <h2 className="result-head">Results</h2>
              {playerNames &&
                playerNames.map((playerName) => (
                  <p key={playerName}>
                    {playerName}: {scores[playerName]}
                  </p>
                ))}
              <Link class="btn" to="/">
                Play Again
              </Link>
            </div>
          </div>

          <div class="finish-container">
            <div class="star">&#10022;</div>
            <div class="finish-main">
              <p className="trophy-label">
                <h4 className="winner">Winner!</h4>
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
      </div>
    </div>
  );
}

export default Finish;
