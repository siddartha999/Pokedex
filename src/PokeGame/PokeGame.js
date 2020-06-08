import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import generateRandomLists from "../services/generateRandomLists";
import StackCards from "../StackCards/StackCards";
import "./PokeGame.css";

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

const PokeGame = (props) => {
  const classes = useStyles();
  const pokemonList = props.pokemonList;
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [cardsPerGame, setCardsPerGame] = useState(ALLOWED_CARDS_PER_GAME[0]);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [whoseTurn, setWhoseTurn] = useState(undefined);
  const [isStatSelected, setIsStatSelected] = useState(false);
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

  const statSelected = (statName) => {
    setIsStatSelected(true);
    setCardsRemaining(() => cardsRemaining - 1);

    const player1Score = retrieveStat(player1Cards[0].stats, statName);
    const player2Score = retrieveStat(player2Cards[0].stats, statName);

    determineWinnerOfCurrentRound(player1Score, player2Score);
  };

  const continueGameHandler = () => {
    setIsStatSelected(false);

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
    setIsStatSelected(false);
    setWhoseTurn(undefined);
  };

  const generatePreGameJSX = () => {
    const preGameJSX = (
      <div className="PokeGame-start-game-screen">
        <div className="PokeGame-start-game-button-container">
          <div className="PokeGame-start-game-button-group-container">
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
    const cardsJSX = (
      <div className="PokeGame-players-card-lists-container">
        <div className={`PokeGame-player-Poke-card-list-container`}>
          <StackCards
            card={player1Cards && player1Cards[0]}
            displayFrontOfCard={whoseTurn === 1 || isStatSelected}
            statSelected={statSelected}
            isStatSelected={isStatSelected}
          />
        </div>

        <div className={`PokeGame-player-Poke-card-list-container`}>
          <StackCards
            card={player2Cards && player2Cards[0]}
            statSelected={statSelected}
            isStatSelected={isStatSelected}
            displayFrontOfCard={whoseTurn === 2 || isStatSelected}
          />
        </div>
      </div>
    );

    const playerTurnTextJSX = (
      <div className="PokeGame-player-turn-indicator-container">
        <p className="PokeGame-player-turn-indicator-text PokeGame-stats-text">
          Player {whoseTurn} Turn
        </p>
      </div>
    );

    const pickPlayerRandomlyButtonJSX = (
      <div className="PokeGame-pick-player-to-start-button-container">
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
        className={`PokeGame-continue-game-button-container ${
          !isStatSelected && " hide"
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
      <div className="PokeGame-end-game-button-container">
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
        className={`PokeGame-round-winner-indicator-container ${
          !isStatSelected && " hide"
        }`}
      >
        <p className="PokeGame-round-winner-indicator PokeGame-stats-text">
          Player {whoseTurn} won this round!
        </p>
      </div>
    );

    const statsArenaJSX = (
      <div className="PokeGame-stats-arena">
        <div className="PokeGame-stats-arena-header-container">
          {!whoseTurn && pickPlayerRandomlyButtonJSX}
          {!cardsRemaining && generateWinnerJSX()}
          {!cardsRemaining ? endGameButtonJSX : continueGameButtonJSX}
        </div>
        <div className="PokeGame-players-score-container">
          <div className="PokeGame-individual-player-score-container">
            <p className="PokeGame-stats-text">Player1 : {player1Score}</p>
          </div>
          <div className="PokeGame-individual-player-score-container">
            <p className="PokeGame-stats-text">Player2 : {player2Score}</p>
          </div>
          {whoseTurn && cardsRemaining && playerTurnTextJSX}
          <div className="PokeGame-cards-remaining-indicator-container">
            <p className="PokeGame-stats-text">
              Cards Remaining: {cardsRemaining}
            </p>
          </div>
          {roundWinnerJSX}
        </div>
      </div>
    );

    const gameJSX = (
      <div className="PokeGame">
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
        <div className="PokeGame-winner-message-container">
          <p className="PokeGame-draw-message">It's a DRAW!!! </p>
        </div>
      );
    }

    if (!winnerJSX) {
      winnerJSX = (
        <div className="PokeGame-winner-message-container">
          <p className="PokeGame-winner-message">
            Congratulations player {winner} for the victory!!!
          </p>
        </div>
      );
    }

    return winnerJSX;
  };

  return <>{!hasGameStarted ? generatePreGameJSX() : generateGameJSX()}</>;
};

export default PokeGame;
