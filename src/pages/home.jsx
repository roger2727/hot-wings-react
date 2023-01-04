import React from "react";
import logo from "../images/logo.png";
import PlayerList from "../components/GameStart";
const home = () => {
  return (
    <div>
      <header>
        <img className="logo" src={logo} alt="" />
      </header>
      <PlayerList />
      <footer className="footer">
        <p className="cp-text">© Copyright 2022. All rights reserved</p>
      </footer>
    </div>
  );
};

export default home;
