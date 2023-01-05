import React from "react";
import "./Home.css";
import PlayerList from "../components/GameStart";
const home = () => {
  return (
    <div className="home-container">
      <PlayerList />
    </div>
  );
};

export default home;
