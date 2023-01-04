import React from "react";
import logobl from "../images/game-logo.png";
import "./Game.css";
import RandomNumberAndCurrentPlayer from "../components/GameMode";
const Game = () => {
  return (
    <div className="container">
      <RandomNumberAndCurrentPlayer />
    </div>
  );
};

export default Game;
