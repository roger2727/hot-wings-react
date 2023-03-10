import { useState, useEffect } from "react";
import "./GameMode.css";
import hotsauce from "../images/hotsauce.png";
import gamelogo from "../images/game-logo1.png";

function RandomNumberAndCurrentPlayer(props) {
  const [isRotated, setIsRotated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scores, setScores] = useState({});
  const [round, setRound] = useState(1);
  const [randomNumber, setRandomNumber] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [randomChallenge, setRandomChallenge] = useState(null);
  const [randomNumberGenerated, setRandomNumberGenerated] = useState(false);
  const checkboxValue = window.sessionStorage.getItem("checkboxValue");
  const checkboxValue2 = window.sessionStorage.getItem("checkboxValue2");
  const easyChallenges = [
    "down your drnk",
    "Have a drink",
    "Choose someone to have a drink",
    "Eat 2x wings",
    "Choose some one to eat your wing",
    "skip your wing",
    "last person to touch the floor downs your drink",
    "evryone downs there drink",
    "everyone have a drink",
  ];
  const challenges =
    checkboxValue2 === "true"
      ? easyChallenges
      : [
          "Take a shot",
          "Have a drink",
          "Choose someone to take a shot",
          "Eat 2x wings",
          "Choose some one to eat your wing",
          "skip your wing",
          "last person to touch the floor does a shot",
          "evryone do a shot",
          "everyone have a drink",
        ];

  // Define playersFromStorage here so it's available to both useEffect hooks
  const playersFromStorage = JSON.parse(
    window.sessionStorage.getItem("players")
  );
  useEffect(() => {
    // Get the number of rounds from session storage
    const numRoundsFromStorage = JSON.parse(
      window.sessionStorage.getItem("numRounds")
    );

    // If the number of rounds equals the number of rounds from session storage, navigate to another page
    if (round === numRoundsFromStorage) {
      window.sessionStorage.setItem("scores", JSON.stringify(scores));
      window.location.assign("/finish");
    }
  }, [round, scores]); // Run the effect when the round changes

  useEffect(() => {
    // Initialize scores
    playersFromStorage.forEach((player) => {
      setScores((scores) => ({ ...scores, [player.name]: 0 }));
    });
  }, []); // Only run the effect once

  useEffect(() => {
    // Generate a random number between 1 and the number of hot sauces
    const numHotSauces = JSON.parse(
      window.sessionStorage.getItem("numHotSauces")
    );
    // const newRandomNumber = Math.floor(Math.random() * numHotSauces) + 1;
    // setRandomNumber(newRandomNumber);

    // Set the players and current player index
    setPlayers(playersFromStorage);
    setCurrentPlayerIndex(0);
  }, []); // Only run the effect once
  const handleButtonClick = () => {
    // Generate a new random number
    const numHotSauces = JSON.parse(
      window.sessionStorage.getItem("numHotSauces")
    );
    const newRandomNumber = Math.floor(Math.random() * numHotSauces) + 1;
    setRandomNumber(newRandomNumber);

    // Update the score of the current player
    setScores((scores) => {
      const newScores = { ...scores };
      newScores[players[currentPlayerIndex].name] += newRandomNumber;
      return newScores;
    });

    // Set the buttonClicked state to true
    setButtonClicked(true);

    // Set the randomNumberGenerated state to true
    setRandomNumberGenerated(true);

    // Generate a random challenge
    const newRandomChallenge =
      challenges[Math.floor(Math.random() * challenges.length)];
    setRandomChallenge(newRandomChallenge);
    setIsRotated(true);
  };
  useEffect(() => {
    if (!buttonClicked) {
      setIsRotated(false);
    }
  }, [buttonClicked]);
  const handleNextPlayerClick = () => {
    // Reset the randomNumberGenerated state to false
    setRandomNumberGenerated(false);

    // Reset the buttonClicked state to false
    setButtonClicked(false);

    // Advance to the next player
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);

    // If the next player is player 1, increment the round
    if (nextPlayerIndex === 0) {
      setRound((round) => round + 1);
    }
  };

  return (
    <div className="box">
      <div className="banner">
        <img className="game-logo" src={gamelogo} />
      </div>
      <div className="top">
        <h3>Round {round}</h3>

        {players.length > 0 ? (
          <h2>Player: {players[currentPlayerIndex].name}</h2>
        ) : (
          <p>No players added yet</p>
        )}
        {players.map((player, index) => {
          if (index === currentPlayerIndex) {
            return <p key={player.name}>score: {scores[player.name]}</p>;
          }
        })}
        <button onClick={handleButtonClick} disabled={randomNumberGenerated}>
          Hot Sauce Randomizer
        </button>

        {randomNumberGenerated && (
          <div className="overlap">
            <div className={`rotate-on-click ${isRotated ? "rotated" : ""}`}>
              <img src={hotsauce} className={isRotated ? "rotater" : ""} />
              <div className="o">
                <p className={isRotated ? "rotater" : ""}>{randomNumber}</p>
              </div>
            </div>
          </div>
        )}

        {randomChallenge && (
          <h3>
            {randomNumberGenerated ? (
              <div className="chall-box">
                <p>{randomChallenge}</p>
              </div>
            ) : null}
          </h3>
        )}
        <button
          className="next"
          onClick={handleNextPlayerClick}
          disabled={!randomNumberGenerated}
        >
          Next Player
        </button>
      </div>
    </div>
  );
}

export default RandomNumberAndCurrentPlayer;
