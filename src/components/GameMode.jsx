import React, { useState, useEffect } from "react";

function RandomNumberAndCurrentPlayer(props) {
  const [round, setRound] = useState(1);
  const [randomNumber, setRandomNumber] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [randomWord, setRandomWord] = useState(null);
  const challanges = [
    "Take a shot",
    "Have a drink",
    "Choose someone to take a shot",
    "Eat 2x wings",
    "Choose some one to eat you wing",
  ];

  useEffect(() => {
    // Generate a random number between 1 and the number of hot sauces
    const numHotSauces = JSON.parse(
      window.sessionStorage.getItem("numHotSauces")
    );
    const newRandomNumber = Math.floor(Math.random() * numHotSauces) + 1;
    setRandomNumber(newRandomNumber);

    // Retrieve the players from session storage
    const playersFromStorage = JSON.parse(
      window.sessionStorage.getItem("players")
    );
    setPlayers(playersFromStorage);
    setCurrentPlayerIndex(0);
  }, []); // Only run the effect once

  const handleButtonClick = () => {
    // Generate a new random number and update the state variable
    const numHotSauces = JSON.parse(
      window.sessionStorage.getItem("numHotSauces")
    );
    const newRandomNumber = Math.floor(Math.random() * numHotSauces) + 1;
    setRandomNumber(newRandomNumber);

    // Pick a random word from the challanges array and update the randomWord state variable
    const newRandomWord =
      challanges[Math.floor(Math.random() * challanges.length)];
    setRandomWord(newRandomWord);

    // Increment the current player index if the button has already been clicked, otherwise do not change the current player index
    if (buttonClicked) {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      if (currentPlayerIndex === 0) {
        setRound((round) => round + 1);
        const numRounds = JSON.parse(
          window.sessionStorage.getItem("numRounds")
        );
        if (round === numRounds) {
          window.location.assign("/finish");
        }
      }
    } else {
      setButtonClicked(true);
    }

    // Call the prop function from the ChallengesList component
    props.handleButtonClick();
  };

  return (
    <div>
      {buttonClicked ? <p>The random number is: {randomNumber}</p> : null}
      {players.length > 0 ? (
        <p>Current player: {players[currentPlayerIndex].name}</p>
      ) : (
        <p>No players added yet</p>
      )}
      {randomWord ? <p>The random word is: {randomWord}</p> : null}
      <h2>Round {round}</h2>

      <button type="button" onClick={handleButtonClick}>
        Generate random number and go to next player
      </button>
    </div>
  );
}

export default RandomNumberAndCurrentPlayer;
