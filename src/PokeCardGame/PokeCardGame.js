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
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [whoseTurn, setWhoseTurn] = useState(undefined);
  const [selectedStat, setSelectedStat] = useState(false);
  const [cardsRemaining, setCardsRemaining] = useState(
    ALLOWED_CARDS_PER_GAME[0]
  );

  const startGameHandler = () => {
    setHasGameStarted(true);
    const cardsList = generateRandomLists(pokemonList, 2, cardsPerGame);
    setPlayer1Cards(cardsList[0]);
    setPlayer2Cards(cardsList[1]);
    setCardsRemaining(cardsList[0].length);
  };

  const handleCardsButtonClicked = (event) => {
    const val = event.target.parentElement.name;
    if (val) {
      setCardsPerGame(event.target.parentElement.name);
    }
  };

  const pickPlayerHandler = () => {
    const playerRandomlyPicked = Math.ceil(Math.random() * 2);
    setWhoseTurn(playerRandomlyPicked);
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

  const determineWinnerOfCurrentRound = (playerOneScore, playerTwoScore) => {
    if (whoseTurn === 1) {
      if (playerOneScore <= playerTwoScore) {
        setWhoseTurn(2);
        setPlayer2Score(() => player2Score + 1);
      } else {
        setPlayer1Score(() => player1Score + 1);
      }
    } else {
      if (playerOneScore >= playerTwoScore) {
        setWhoseTurn(1);
        setPlayer1Score(() => player1Score + 1);
      } else {
        setPlayer2Score(() => player2Score + 1);
      }
    }
  };

  const statSelectedHandler = (statName) => {
    setSelectedStat(statName);
    setCardsRemaining(() => cardsRemaining - 1);

    const player1Score = retrieveStat(player1Cards[0].stats, statName);
    const player2Score = retrieveStat(player2Cards[0].stats, statName);

    determineWinnerOfCurrentRound(player1Score, player2Score);
  };

  const continueGameHandler = () => {
    setSelectedStat(undefined);

    const newPlayer1Cards = [...player1Cards];
    const newPlayer2Cards = [...player2Cards];
    newPlayer1Cards.shift();
    newPlayer2Cards.shift();

    setPlayer1Cards(newPlayer1Cards);
    setPlayer2Cards(newPlayer2Cards);
  };

  const endGameHandler = () => {
    setHasGameStarted(false);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setSelectedStat(undefined);
    setWhoseTurn(undefined);
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
          {whoseTurn === 1 || selectedStat ? (
            <PokeCard
              data={player1Cards[0]}
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
          {whoseTurn === 2 || selectedStat ? (
            <PokeCard
              data={player2Cards[0]}
              displayAdvancedStats
              statSelected={statSelectedHandler}
              selectedStat={selectedStat}
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
          Player {whoseTurn} Turn
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
          Pick A Random Player To Start
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
          Player {whoseTurn} won this round!
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
            <p className="PokeCardGame-stats-text">Player1 : {player1Score}</p>
          </div>
          <div className="PokeCardGame-individual-player-score-container">
            <p className="PokeCardGame-stats-text">Player2 : {player2Score}</p>
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
    let winnerJSX;
    let winner;
    if (player1Score > player2Score) {
      winner = 1;
    } else if (player2Score > player1Score) {
      winner = 2;
    } else {
      winnerJSX = (
        <div className="PokeCardGame-winner-message-container">
          <p className="PokeCardGame-draw-message">It's a DRAW!!! </p>
        </div>
      );
    }

    if (!winnerJSX) {
      winnerJSX = (
        <div className="PokeCardGame-winner-message-container">
          <p className="PokeCardGame-winner-message">
            Congratulations player {winner} for the victory!!!
          </p>
        </div>
      );
    }

    return winnerJSX;
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
