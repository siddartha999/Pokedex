import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import generateRandomLists from "../services/generateRandomLists";
import "./PokeGame.css";

const ALLOWED_CARDS_PER_GAME = [20, 50, 100];
const NUMBER_OF_PLAYERS = [2, 3, 5];

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
  const [totalPlayers, setTotalPlayers] = useState(NUMBER_OF_PLAYERS[0]);
  let player1Cards = [];
  let player2Cards = [];

  const startGameHandler = () => {
    setHasGameStarted(!hasGameStarted);
    [player1Cards, player2Cards] = generateRandomLists(
      pokemonList,
      totalPlayers,
      cardsPerGame
    );
    console.log(player1Cards, player2Cards);
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

  const gameJSX = <></>;

  return <>{hasGameStarted ? gameJSX : preGameJSX}</>;
};

export default PokeGame;
