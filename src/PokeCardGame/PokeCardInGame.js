import React from "react";
import Button from "@material-ui/core/Button";
import PokeCard from "../PokeCard/PokeCard";
import pokeCardBack from "../images/pokeCardBack-2.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { pickStatRandomlyValueContext } from "../services/contextInitializers";

const useStyles = makeStyles((theme) => ({
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

const PokeCardInGame = (props) => {
  const classes = useStyles();
  const playerNames = props.playerNames;
  const cardsRemaining = props.cardsRemaining;
  const humanScore = props.humanScore;
  const systemScore = props.systemScore;
  const humanCards = props.humanCards;
  const selectedStat = props.selectedStat;
  const systemCards = props.systemCards;
  const whoseTurn = props.whoseTurn;
  const currentRoundWinner = props.currentRoundWinner;

  const pickPlayerInRandomButtonHandler = () => {
    props.handlePickPlayerToStart();
  };

  const endGameButtonHandler = () => {
    props.handleEndGame();
  };

  const continueGameButtonHandler = () => {
    props.handleGameContinuity();
  };

  const generateWinnerJSX = () => {
    let result;
    if (humanScore > systemScore) {
      result = (
        <p className="PokeCardGame-winner-message">
          Congratulations {playerNames.HUMAN} for the victory!!
        </p>
      );
    } else if (systemScore > humanScore) {
      result = (
        <p className="PokeCardGame-loser-message">
          Sorry {playerNames.HUMAN}, you lose.
        </p>
      );
    } else {
      result = <p className="PokeCardGame-draw-message">It's a DRAW!!! </p>;
    }

    return (
      <div className="PokeCardGame-winner-message-container">{result}</div>
    );
  };

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
        {whoseTurn === playerNames.HUMAN || selectedStat ? (
          <PokeCard data={humanCards[0]} displayAdvancedStats />
        ) : (
          backOfCardJSX
        )}
      </div>

      <div className="PokeCardGame-player-poke-card-container">
        {whoseTurn === playerNames.SYSTEM || selectedStat ? (
          <pickStatRandomlyValueContext.Provider value={!selectedStat}>
            <PokeCard data={systemCards[0]} displayAdvancedStats />
          </pickStatRandomlyValueContext.Provider>
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
        onClick={pickPlayerInRandomButtonHandler}
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
        onClick={continueGameButtonHandler}
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
        onClick={endGameButtonHandler}
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

export default PokeCardInGame;
