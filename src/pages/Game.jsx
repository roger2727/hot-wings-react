import React from "react";
import logobl from "../images/game-logo.png";
import "./Game.css";
import RandomNumberAndCurrentPlayer from "../components/GameMode";
const Game = () => {
  return (
    <div className="container">
      <img className="pic" src={logobl} alt="" />

      <div className="row">
        <div className="box">
          <div className="rando">
            <form className="form-horizontal"></form>
            <RandomNumberAndCurrentPlayer />
            <p id="quoteshere"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
