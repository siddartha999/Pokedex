import React, { useState, useRef } from "react";
import generateRandomLists from "../services/generateRandomLists";
import "./PokeCardGame.css";
import { Prompt } from "react-router-dom";
import PokeCardPreGame from "./PokeCardPreGame";
import PokeCardInGame from "./PokeCardInGame";
import {
  statSelectedFromPokeCardContext,
  selectedStatValueContext,
} from "../services/contextInitializers";

const ALLOWED_CARDS_PER_GAME = [20, 50, 100];
const CARD_GAME_PLAYER_NAMES = { HUMAN: "Human", SYSTEM: "System" };

const PokeCardGame = (props) => {
  const pokemonList = props.pokemonList;
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [cardsPerGame, setCardsPerGame] = useState(ALLOWED_CARDS_PER_GAME[0]);
  const humanCards = useRef([]);
  const systemCards = useRef([]);
  const humanScore = useRef(0);
  const systemScore = useRef(0);
  const [whoseTurn, setWhoseTurn] = useState(undefined);
  const [selectedStat, setSelectedStat] = useState(false);
  const cardsRemaining = useRef(ALLOWED_CARDS_PER_GAME[0]);
  const currentRoundWinner = useRef(undefined);

  const startPokeCardGame = () => {
    setHasGameStarted(true);
    const cardsList = generateRandomLists(pokemonList, 2, cardsPerGame);
    humanCards.current = cardsList[0];
    systemCards.current = cardsList[1];
    cardsRemaining.current = cardsList[0].length;
  };

  const totalCardsChosen = (val) => {
    setCardsPerGame(val);
  };

  const handlePickPlayerToStart = () => {
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
        systemScore.current = systemScore.current + 1;
        currentRoundWinner.current = CARD_GAME_PLAYER_NAMES.SYSTEM;
      } else {
        humanScore.current = humanScore.current + 1;
        currentRoundWinner.current = CARD_GAME_PLAYER_NAMES.HUMAN;
      }
    } else {
      if (playerOneScore >= playerTwoScore) {
        humanScore.current = humanScore.current + 1;
        currentRoundWinner.current = CARD_GAME_PLAYER_NAMES.HUMAN;
      } else {
        systemScore.current = systemScore.current + 1;
        currentRoundWinner.current = CARD_GAME_PLAYER_NAMES.SYSTEM;
      }
    }
  };

  const handlePokeCardStatSelected = (statName) => {
    setSelectedStat(statName);
    cardsRemaining.current = cardsRemaining.current - 1;

    const humanScore = retrieveStat(humanCards.current[0].stats, statName);
    const systemScore = retrieveStat(systemCards.current[0].stats, statName);

    determineCurrentRoundWinner(humanScore, systemScore);
  };

  const handleGameContinuity = () => {
    setSelectedStat(undefined);

    setWhoseTurn(currentRoundWinner.current);

    const newHumanCards = [...humanCards.current];
    const newSystemCards = [...systemCards.current];
    newHumanCards.shift();
    newSystemCards.shift();

    humanCards.current = newHumanCards;
    systemCards.current = newSystemCards;
  };

  const handleEndGame = () => {
    setHasGameStarted(false);
    humanScore.current = 0;
    systemScore.current = 0;
    setSelectedStat(undefined);
    setWhoseTurn(undefined);
    currentRoundWinner.current = null;
  };

  const generatePokeCardPreGameJSX = () => {
    return (
      <PokeCardPreGame
        totalCardsChosen={totalCardsChosen}
        startPokeCardGame={startPokeCardGame}
        cardsPerGame={cardsPerGame}
        ALLOWED_CARDS_PER_GAME={ALLOWED_CARDS_PER_GAME}
      />
    );
  };

  const generatePokeCardInGameJSX = () => {
    return (
      <statSelectedFromPokeCardContext.Provider
        value={handlePokeCardStatSelected}
      >
        <selectedStatValueContext.Provider value={selectedStat}>
          <PokeCardInGame
            playerNames={CARD_GAME_PLAYER_NAMES}
            cardsRemaining={cardsRemaining.current}
            humanScore={humanScore.current}
            systemScore={systemScore.current}
            humanCards={humanCards.current}
            systemCards={systemCards.current}
            selectedStat={selectedStat}
            handlePickPlayerToStart={handlePickPlayerToStart}
            whoseTurn={whoseTurn}
            currentRoundWinner={currentRoundWinner.current}
            handleEndGame={handleEndGame}
            handleGameContinuity={handleGameContinuity}
          />
        </selectedStatValueContext.Provider>
      </statSelectedFromPokeCardContext.Provider>
    );
  };

  return (
    <>
      {hasGameStarted
        ? generatePokeCardInGameJSX()
        : generatePokeCardPreGameJSX()}
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
