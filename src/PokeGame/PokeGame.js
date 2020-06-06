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
  button: {
    margin: theme.spacing(1),
    height: "5rem",
    width: "50%",
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
  const [displayAllCards, setDisplayAllCards] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [displayContinuePlayButton, setDisplayContinuePlayButton] = useState(
    false
  );

  const startGameHandler = () => {
    setHasGameStarted(!hasGameStarted);
    const cardsList = generateRandomLists(pokemonList, 2, cardsPerGame);
    setPlayer1Cards(cardsList[0]);
    setPlayer2Cards(cardsList[1]);
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
    setDisplayAllCards(true);
    setDisplayContinuePlayButton(true);

    const player1Score = retrieveStat(player1Cards[0].stats, statName);
    const player2Score = retrieveStat(player2Cards[0].stats, statName);

    console.log(player1Score, player2Score);
    determineWinnerOfCurrentRound(player1Score, player2Score);
  };

  const continueGameHandler = () => {
    setDisplayContinuePlayButton(false);
    setDisplayAllCards(false);
    setIsStatSelected(false);
    player1Cards.shift();
    player2Cards.shift();

    if (!player1Cards.length || !player2Cards.length) {
      setIsGameOver(true);
    }
  };

  const preGameJSX = (
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
        className={classes.button}
        onClick={startGameHandler}
      >
        Start Game : {cardsPerGame} Cards
      </Button>
    </div>
  );

  const cardsJSX = (
    <div className="PokeGame-players-card-lists-container">
      <div className={`PokeGame-player-Poke-card-list-container`}>
        <StackCards
          card={player1Cards[0]}
          displayFrontOfCard={whoseTurn === 1 || displayAllCards}
          statSelected={statSelected}
          isStatSelected={isStatSelected}
        />
      </div>

      <div className={`PokeGame-player-Poke-card-list-container`}>
        <StackCards
          card={player2Cards[0]}
          statSelected={statSelected}
          isStatSelected={isStatSelected}
          displayFrontOfCard={whoseTurn === 2 || displayAllCards}
        />
      </div>
    </div>
  );

  const playerTurnTextJSX = <p>Player {whoseTurn} Turn</p>;

  const pickPlayerRandomlyButtonJSX = (
    <button onClick={pickPlayerHandler}>Pick A Random Player To Start</button>
  );

  const continueGameButtonJSX = (
    <>
      <button onClick={continueGameHandler}>Continue For The Next Round</button>
      <p>Player {whoseTurn} won this round!!!</p>
    </>
  );

  const scoresJSX = (
    <div className="PokeGame-players-score-container">
      <div className="PokeGame-individual-player-score-container">
        <p>Player1 : {player1Score}</p>
      </div>
      {whoseTurn ? playerTurnTextJSX : pickPlayerRandomlyButtonJSX}
      {displayContinuePlayButton && continueGameButtonJSX}
      <div className="PokeGame-individual-player-score-container">
        <p>Player2 : {player2Score}</p>
      </div>
      <div>
        <p>Cards Remaining: {player1Cards ? player1Cards.length : 0}</p>
      </div>
    </div>
  );

  const gameJSX = (
    <div className="PokeGame">
      {cardsJSX}
      {scoresJSX}
    </div>
  );

  return <>{!hasGameStarted || isGameOver ? preGameJSX : gameJSX}</>;
};

export default PokeGame;
