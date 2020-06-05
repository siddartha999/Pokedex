import React, { useState } from "react";
import Pokedex from "../Pokedex/Pokedex";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
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

/**
 *This function returns two lists with random pokemons picked from the pokemons list.
 This function works best when the length of the list is EVEN, which is crucial for the game to be fair!
 * @param {*} list -> List of Pokemons.
 */
const generateListsWithRandomIds = (list) => {
  const list1 = [];
  const list2 = [...list];
  let randomNum;
  while (list1.length < list2.length) {
    randomNum = Math.floor(Math.random() * list2.length);
    list1.push(...list2.splice(randomNum, 1));
  }
  return [list1, list2];
};

const PokeGame = (props) => {
  const classes = useStyles();
  const pokemonList = props.pokemonList;
  const [list1, list2] = generateListsWithRandomIds(pokemonList);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [cardsPerGame, setCardsPerGame] = useState(20);

  const score1 = list1.reduce(
    (exp, pokemon) => exp + pokemon.base_experience,
    0
  );
  const score2 = list2.reduce(
    (exp, pokemon) => exp + pokemon.base_experience,
    0
  );
  const winner =
    score1 > score2 ? "1" : score1 !== score2 ? "2" : "The scores are TIED!!!";

  const clickHandler = () => {
    setHasGameStarted(!hasGameStarted);
  };

  const handleCardsButtonClicked = (event) => {
    const val = event.target.parentElement.name;
    if (val) {
      setCardsPerGame(event.target.parentElement.name);
    }
  };

  const startGameButtonJSX = (
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
      >
        Start Game : {cardsPerGame} Cards
      </Button>
    </div>
  );

  const replayGameJSX = (
    <div>
      <button onClick={clickHandler}>Replay!</button>
    </div>
  );

  const gameJSX = (
    <>
      <p>Total Experience: {score1}</p>
      <Pokedex pokemonList={list1} />
      <p>Total Experience: {score2}</p>
      <Pokedex pokemonList={list2} />
      <div className="PokeGame-winner">
        <p className="PokeGame-winner-msg">Player {winner} is the Winner!!!</p>
      </div>
      {replayGameJSX}
    </>
  );

  return <>{hasGameStarted ? gameJSX : startGameButtonJSX}</>;
};

export default PokeGame;
