import React, { useState } from "react";
import Pokedex from "../Pokedex/Pokedex";
import "./PokeGame.css";

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
  const pokemonList = props.pokemonList;
  const [list1, list2] = generateListsWithRandomIds(pokemonList);
  const [hasGameStarted, setHasGameStarted] = useState(false);

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

  const startGameButtonJSX = (
    <div className="PokeGame-start-game-button-container">
      <button className="PokeGame-start-game-button" onClick={clickHandler}>
        START GAME
      </button>
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
