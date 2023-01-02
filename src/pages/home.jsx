import React from "react";
import logo from "../images/logo.png";
import PlayerList from "../components/GameStart";
const home = () => {
  return (
    <div>
      <header>
        <img class="logo" src={logo} alt="" />
      </header>
      <PlayerList />
      <footer class="footer">
        <p class="cp-text">© Copyright 2022. All rights reserved</p>
      </footer>
    </div>
  );
};

export default home;
