import React from "react";
import "./Home.css";
import PlayerList from "../components/GameStart";
const home = () => {
  return (
    <div className="home-container">
      <PlayerList />
      <footer className="footer">
        <p className="cp-text">© Copyright 2022. All rights reserved</p>
      </footer>
    </div>
  );
};

export default home;
