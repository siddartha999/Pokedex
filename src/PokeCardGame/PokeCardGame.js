import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import generateRandomLists from "../services/generateRandomLists";
import PokeCard from "../PokeCard/PokeCard";
import "./PokeCardGame.css";
import pokeCardBack from "../images/pokeCardBack-2.jpg";
import { Prompt } from "react-router-dom";

const ALLOWED_CARDS_PER_GAME = [20, 50, 100];
const CARD_GAME_PLAYER_NAMES = { HUMAN: "Human", SYSTEM: "System" };

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  startGameButton: {
    height: "5rem",
    width: "100%",
    minWidth: "5rem",
    fontSize: "1.25rem",
    fontFamily: "cursive",
    fontStyle: "italic",
    "&:hover": {
      backgroundColor: "lightslategray",
    },
  },
  active: {
    backgroundColor: "firebrick",
  },
  pickPlayerButton: {
    fontFamily: "cursive",
    fontStyle: "italic",
    backgroundColor: "blanchedalmond",
    color: "darkblue",
    "&:hover": {
      color: "wheat",
    },
  },
}));

const PokeCardGame = (props) => {
  const classes = useStyles();
  const pokemonList = props.pokemonList;
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [cardsPerGame, setCardsPerGame] = useState(ALLOWED_CARDS_PER_GAME[0]);
  const [humanCards, setHumanCards] = useState([]);
  const [systemCards, setSystemCards] = useState([]);
  const [humanScore, setHumanScore] = useState(0);
  const [systemScore, setSystemScore] = useState(0);
  const [whoseTurn, setWhoseTurn] = useState(undefined);
  const [selectedStat, setSelectedStat] = useState(false);
  const [cardsRemaining, setCardsRemaining] = useState(
    ALLOWED_CARDS_PER_GAME[0]
  );
  const [currentRoundWinner, setCurrentRoundWinner] = useState(undefined);

  const startGameHandler = () => {
    setHasGameStarted(true);
    const cardsList = generateRandomLists(pokemonList, 2, cardsPerGame);
    setHumanCards(cardsList[0]);
    setSystemCards(cardsList[1]);
    setCardsRemaining(cardsList[0].length);
  };

  const handleCardsButtonClicked = (event) => {
    const val = event.target.parentElement.name;
    if (val) {
      setCardsPerGame(event.target.parentElement.name);
    }
  };

  const pickPlayerHandler = () => {
    const playerRandomlyPicked = Math.floor(Math.random() * 2);
    if (playerRandomlyPicked === 0) {
      setWhoseTurn(CARD_GAME_PLAYER_NAMES.HUMAN);
    } else {
      setWhoseTurn(CARD_GAME_PLAYER_NAMES.SYSTEM);
    }
  };

  const retrieveStat = (obj, statName) => {
    let score = 0;

    for (let stat of obj) {
      if (stat.stat.name === statName) {
        score = stat.base_stat;
        break;
      }
    }

    return score;
  };

  const determineCurrentRoundWinner = (playerOneScore, playerTwoScore) => {
    if (whoseTurn === CARD_GAME_PLAYER_NAMES.HUMAN) {
      if (playerOneScore <= playerTwoScore) {
        setSystemScore(() => systemScore + 1);
        setCurrentRoundWinner(() => CARD_GAME_PLAYER_NAMES.SYSTEM);
      } else {
        setHumanScore(() => humanScore + 1);
        setCurrentRoundWinner(() => CARD_GAME_PLAYER_NAMES.HUMAN);
      }
    } else {
      if (playerOneScore >= playerTwoScore) {
        setHumanScore(() => humanScore + 1);
        setCurrentRoundWinner(() => CARD_GAME_PLAYER_NAMES.HUMAN);
      } else {
        setCurrentRoundWinner(() => CARD_GAME_PLAYER_NAMES.SYSTEM);
      }
    }
  };

  const statSelectedHandler = (statName) => {
    setSelectedStat(statName);
    setCardsRemaining(() => cardsRemaining - 1);

    const humanScore = retrieveStat(humanCards[0].stats, statName);
    const systemScore = retrieveStat(systemCards[0].stats, statName);

    determineCurrentRoundWinner(humanScore, systemScore);
  };

  const continueGameHandler = () => {
    setSelectedStat(undefined);

    setWhoseTurn(currentRoundWinner);

    const newHumanCards = [...humanCards];
    const newSystemCards = [...systemCards];
    newHumanCards.shift();
    newSystemCards.shift();

    setHumanCards(newHumanCards);
    setSystemCards(newSystemCards);
  };

  const endGameHandler = () => {
    setHasGameStarted(false);
    setHumanScore(0);
    setSystemScore(0);
    setSelectedStat(undefined);
    setWhoseTurn(undefined);
    setCurrentRoundWinner(undefined);
  };

  const generatePreGameJSX = () => {
    const preGameJSX = (
      <div className="PokeCardGame-start-game-screen">
        <div className="PokeCardGame-start-game-button-container">
          <div className="PokeCardGame-start-game-button-group-container">
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
              className={classes.root}
            >
              {ALLOWED_CARDS_PER_GAME.map((val) => (
                <Button name={val} key={val} onClick={handleCardsButtonClicked}>
                  {val} Cards Each
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.startGameButton}
            onClick={startGameHandler}
          >
            Start Game : {cardsPerGame} Cards
          </Button>
        </div>
      </div>
    );

    return preGameJSX;
  };

  const generateGameJSX = () => {
    const backOfCardJSX = (
      <img
        className="PokeCardGame-player-poke-card-backside-image"
        src={pokeCardBack}
        alt="poke-card-back-side"
      />
    );

    const cardsJSX = (
      <div className="PokeCardGame-players-card-lists-container">
        <div className="PokeCardGame-player-poke-card-container">
          {whoseTurn === CARD_GAME_PLAYER_NAMES.HUMAN || selectedStat ? (
            <PokeCard
              data={humanCards[0]}
              displayAdvancedStats
              statSelected={statSelectedHandler}
              selectedStat={selectedStat}
              pokemonTypeImages={props.pokemonTypeImages}
            />
          ) : (
            backOfCardJSX
          )}
        </div>

        <div className="PokeCardGame-player-poke-card-container">
          {whoseTurn === CARD_GAME_PLAYER_NAMES.SYSTEM || selectedStat ? (
            <PokeCard
              data={systemCards[0]}
              displayAdvancedStats
              statSelected={statSelectedHandler}
              selectedStat={selectedStat}
              pickStatRandomly={!selectedStat}
              pokemonTypeImages={props.pokemonTypeImages}
            />
          ) : (
            backOfCardJSX
          )}
        </div>
      </div>
    );

    const playerTurnTextJSX = (
      <div className="PokeCardGame-player-turn-indicator-container">
        <p className="PokeCardGame-player-turn-indicator-text PokeCardGame-stats-text">
          {whoseTurn} Turn
        </p>
      </div>
    );

    const pickPlayerRandomlyButtonJSX = (
      <div className="PokeCardGame-pick-player-to-start-button-container">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.pickPlayerButton}
          onClick={pickPlayerHandler}
        >
          Assign Initial Turn Randomly
        </Button>
      </div>
    );

    const continueGameButtonJSX = (
      <div
        className={`PokeCardGame-continue-game-button-container ${
          !selectedStat && " hide"
        }`}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.pickPlayerButton}
          onClick={continueGameHandler}
        >
          Continue For The Next Round
        </Button>
      </div>
    );

    const endGameButtonJSX = (
      <div className="PokeCardGame-end-game-button-container">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.pickPlayerButton}
          onClick={endGameHandler}
        >
          End Game
        </Button>
      </div>
    );

    const roundWinnerJSX = (
      <div
        className={`PokeCardGame-round-winner-indicator-container ${
          !selectedStat && " hide"
        }`}
      >
        <p className="PokeCardGame-round-winner-indicator PokeCardGame-stats-text">
          {currentRoundWinner} won this round!
        </p>
      </div>
    );

    const statsArenaJSX = (
      <div className="PokeCardGame-stats-arena">
        <div className="PokeCardGame-stats-arena-header-container">
          {!whoseTurn && pickPlayerRandomlyButtonJSX}
          {!cardsRemaining && generateWinnerJSX()}
          {!cardsRemaining ? endGameButtonJSX : continueGameButtonJSX}
        </div>
        <div className="PokeCardGame-players-score-container">
          <div className="PokeCardGame-individual-player-score-container">
            <p className="PokeCardGame-stats-text">Human : {humanScore}</p>
          </div>
          <div className="PokeCardGame-individual-player-score-container">
            <p className="PokeCardGame-stats-text">System : {systemScore}</p>
          </div>
          {whoseTurn && cardsRemaining ? playerTurnTextJSX : null}
          <div className="PokeCardGame-cards-remaining-indicator-container">
            <p className="PokeCardGame-stats-text">
              Cards Remaining: {cardsRemaining}
            </p>
          </div>
          {roundWinnerJSX}
        </div>
      </div>
    );

    const gameJSX = (
      <div className="PokeCardGame">
        {cardsJSX}
        {statsArenaJSX}
      </div>
    );

    return gameJSX;
  };

  const generateWinnerJSX = () => {
    let result;
    if (humanScore > systemScore) {
      result = (
        <p className="PokeCardGame-winner-message">
          Congratulations {CARD_GAME_PLAYER_NAMES.HUMAN} for the victory!!
        </p>
      );
    } else if (systemScore > humanScore) {
      result = (
        <p className="PokeCardGame-loser-message">
          Sorry {CARD_GAME_PLAYER_NAMES.HUMAN}, you lose.
        </p>
      );
    } else {
      result = <p className="PokeCardGame-draw-message">It's a DRAW!!! </p>;
    }

    return (
      <div className="PokeCardGame-winner-message-container">{result}</div>
    );
  };

  return (
    <>
      {!hasGameStarted ? generatePreGameJSX() : generateGameJSX()}
      <Prompt
        when={hasGameStarted}
        message={(location) => {
          if (!location.pathname.endsWith("game")) {
            return `Are you sure you want to leave the game`;
          }
        }}
      />
    </>
  );
};

export default PokeCardGame;
