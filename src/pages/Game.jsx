import React from "react";

import "./Game.css";
import RandomNumberAndCurrentPlayer from "../components/GameMode";
const Game = () => {
  return (
    <div className="game-container">
      <RandomNumberAndCurrentPlayer />
    </div>
  );
};

export default Game;
