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
      <div className="wrapper">
        <div className="glow"></div>
        <div className="mask">
          <div className="btn-box">
            <div className="results-page">
              <h2 className="result-head">Results</h2>
              {playerNames &&
                playerNames.map((playerName) => (
                  <p className="pl" key={playerName}>
                    {playerName}: {scores[playerName]}
                  </p>
                ))}
              <Link className="btn" to="/">
                Play Again
              </Link>
            </div>
          </div>

          <div className="finish-container">
            <div className="star">&#10022;</div>
            <div className="finish-main">
              <h1 className="trophy-label">
                <p className="winner">Winner!</p>
                <p>{playerWithHighestScore}</p>
              </h1>
            </div>
            <div className="stem1"></div>
            <div className="stemCrease"></div>
            <div className="stem2"></div>
            <div className="base"></div>

            <div className="arms"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finish;
