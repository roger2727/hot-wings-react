import React, { useState } from "react";
import logo from "../images/logo1.png";
import "./GameStart.css";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [numHotSauces, setNumHotSauces] = useState(0);
  const [numRounds, setNumRounds] = useState(0);

  const handleRoundsChange = (event) => {
    setNumRounds(event.target.value);
  };
  const handlePlayerSubmit = (event) => {
    event.preventDefault();
    const playerName = event.target.playerName.value;
    if (!playerName) {
      setError("Please enter a player name");
      return;
    }
    if (players.some((player) => player.name === playerName)) {
      setError("Player name must be unique");
      return;
    }
    setPlayers([...players, { name: playerName, number: players.length + 1 }]);
    event.target.playerName.value = "";
    setError(null);
  };

  const handleHotSauceChange = (event) => {
    setNumHotSauces(event.target.value);
  };

  const handleSubmit = () => {
    if (numHotSauces === 0) {
      setError("Please select a number of hot sauces");
      return;
    }
    window.sessionStorage.setItem("players", JSON.stringify(players));
    window.sessionStorage.setItem("numHotSauces", numHotSauces);
    window.sessionStorage.setItem("numRounds", numRounds);
    window.location.assign("/game");
  };

  return (
    <div className="box">
      <div className="starto">
        <img className="logo" src={logo} alt="" />
      </div>

      <div className="form-box">
        <form onSubmit={handlePlayerSubmit}>
          <div>
            <label>
              Player name:
              <input type="text" name="playerName" />
            </label>
            <button
              className="add-btn"
              type="submit"
              disabled={players.length >= 5}
            >
              Add player
            </button>
          </div>
          {players.length >= 5 && (
            <p className="error-text">Maximum number of players reached</p>
          )}
        </form>
        <form>
          <label>
            Number of hot sauces:
            <select
              name="numHotSauces"
              value={numHotSauces}
              onChange={handleHotSauceChange}
              required
            >
              <option value={0}>Select a number</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 3} value={i + 3}>
                  {i + 3}
                </option>
              ))}
            </select>
          </label>
          <label>
            Number of rounds:
            <select
              name="numRounds"
              value={numRounds}
              onChange={handleRoundsChange}
              required
            >
              <option value={0}>Select a number</option>
              {[...Array(16)].map((_, i) => (
                <option key={i + 5} value={i + 5}>
                  {i + 5}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>
      <ul className="players-box">
        {players.map((player) => (
          <li className="player" key={player.number}>
            Player {player.number}: {player.name}
          </li>
        ))}
      </ul>
      {players.length > 0 && numRounds > 0 && (
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default PlayerList;
