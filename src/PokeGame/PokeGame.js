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

  const startGameHandler = () => {
    setHasGameStarted(!hasGameStarted);
    const cardsList = generateRandomLists(pokemonList, 2, 2);
    setPlayer1Cards(cardsList[0]);
    setPlayer2Cards(cardsList[1]);
  };

  const handleCardsButtonClicked = (event) => {
    const val = event.target.parentElement.name;
    if (val) {
      setCardsPerGame(event.target.parentElement.name);
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
      <div className={`PokeGame-player-Poke-card-list-container left`}>
        <StackCards card={player1Cards[0]} />
      </div>

      <div className={`PokeGame-player-Poke-card-list-container right`}>
        <StackCards card={player2Cards[0]} />
      </div>
    </div>
  );

  const scoresJSX = (
    <div className="PokeGame-players-score-container">
      <div className="PokeGame-individual-player-score-container">
        <p>Player1 : {player1Score}</p>
      </div>

      <div className="PokeGame-individual-player-score-container">
        <p>Player2 : {player2Score}</p>
      </div>
    </div>
  );

  const gameJSX = (
    <div className="PokeGame">
      {cardsJSX}
      {scoresJSX}
    </div>
  );

  return <>{hasGameStarted ? gameJSX : preGameJSX}</>;
};

export default PokeGame;
