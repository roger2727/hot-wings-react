import React, { useState } from "react";
import logo from "../images/game-logo1.png";
import "./GameStart.css";

function PlayerList() {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [checkboxValue2, setCheckboxValue2] = useState(false);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [numHotSauces, setNumHotSauces] = useState(0);
  const [numRounds, setNumRounds] = useState(0);
  const handleCheckboxChange = (event) => {
    setCheckboxValue(event.target.checked);
    if (event.target.checked) {
      setCheckboxValue2(false);
      window.sessionStorage.setItem("checkboxValue2", false);
    }
    window.sessionStorage.setItem("checkboxValue", event.target.checked);
  };

  const handleCheckboxChange2 = (event) => {
    setCheckboxValue(false);
    setCheckboxValue2(event.target.checked);
    window.sessionStorage.setItem("checkboxValue", false);
    window.sessionStorage.setItem("checkboxValue2", event.target.checked);
  };
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
      {players.length >= 5 && (
        <p className="error-text">Maximum number of players reached</p>
      )}
      {error && <p className="error-text">{error}</p>}
      <div className="form-box">
        <form onSubmit={handlePlayerSubmit}>
          <div className="name-box">
            Player name
            <label className="player-input">
              <input type="text" name="playerName" placeholder="enter name" />
            </label>
            <button
              className="add-btn"
              type="submit"
              disabled={players.length >= 5}
            >
              Add Player
            </button>
          </div>
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
          <div className="tick-boxes">
            <label className="start-check">
              <input
                type="checkbox"
                checked={checkboxValue}
                onChange={handleCheckboxChange}
              />
              Shots
            </label>
            <label className="start-check">
              <input
                type="checkbox"
                checked={checkboxValue2}
                onChange={handleCheckboxChange2}
              />
              No Shots
            </label>
          </div>
        </form>

        <ul className="players-box">
          {players.map((player) => (
            <li className="player" key={player.number}>
              {player.number}. {player.name}
            </li>
          ))}
          {(checkboxValue || checkboxValue2) &&
            players.length > 0 &&
            numRounds > 0 && (
              <button
                className="next-start"
                type="button"
                onClick={handleSubmit}
              >
                Start Game
              </button>
            )}
        </ul>
      </div>
    </div>
  );
}

export default PlayerList;
