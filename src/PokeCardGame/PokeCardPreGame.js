import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const PokeCardPreGame = (props) => {
  const classes = useStyles();
  const possibleCardsPerGame = props.ALLOWED_CARDS_PER_GAME;
  const cardsPerGame = props.cardsPerGame;

  const selectTotalCardsButtonHandler = (event) => {
    const val = event.target.parentElement.name;
    if (val) {
      props.totalCardsChosen(val);
    }
  };

  const startGameButtonHandler = () => {
    props.startPokeCardGame();
  };

  return (
    <div className="PokeCardGame-start-game-screen">
      <div className="PokeCardGame-start-game-button-container">
        <div className="PokeCardGame-start-game-button-group-container">
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
            className={classes.root}
          >
            {possibleCardsPerGame.map((val) => (
              <Button
                name={val}
                key={val}
                onClick={selectTotalCardsButtonHandler}
              >
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
          onClick={startGameButtonHandler}
        >
          Start Game : {cardsPerGame} Cards
        </Button>
      </div>
    </div>
  );
};

export default PokeCardPreGame;
