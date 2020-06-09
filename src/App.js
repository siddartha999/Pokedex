import React, { useState, useEffect } from "react";
import "./App.css";
import Pokedex from "./Pokedex/Pokedex";
import PokeCardGame from "./PokeCardGame/PokeCardGame";
import { Route, Switch } from "react-router-dom";
import NavBar from "./Navbar/Navbar";
import Compare from "./Compare/Compare";
import retrievePokemonList from "./services/retrievePokemonList";
import CircularProgress from "@material-ui/core/CircularProgress";
import bugTypeImg from "./images/Bug.png";
import darkTypeImg from "./images/Dark.png";
import dragonTypeImg from "./images/Dragon.png";
import electricTypeImg from "./images/Electric.png";
import fairyTypeImg from "./images/Fairy.png";
import fightingTypeImg from "./images/Fighting.png";
import fireTypeImg from "./images/Fire.png";
import flyingTypeImg from "./images/Flying.png";
import ghostTypeImg from "./images/Ghost.png";
import grassTypeImg from "./images/Grass.png";
import groundTypeImg from "./images/Ground.png";
import iceTypeImg from "./images/Ice.png";
import normalTypeImg from "./images/Normal.png";
import poisonTypeImg from "./images/Poison.png";
import psychicTypeImg from "./images/Psychic.png";
import rockTypeImg from "./images/Rock.png";
import steelTypeImg from "./images/Steel.png";
import waterTypeImg from "./images/Water.png";

const POKEMON_TYPES_IMAGES = new Map(
  Object.entries({
    bug: bugTypeImg,
    dark: darkTypeImg,
    dragon: dragonTypeImg,
    electric: electricTypeImg,
    fairy: fairyTypeImg,
    fighting: fightingTypeImg,
    fire: fireTypeImg,
    flying: flyingTypeImg,
    ghost: ghostTypeImg,
    grass: grassTypeImg,
    ground: groundTypeImg,
    ice: iceTypeImg,
    normal: normalTypeImg,
    poison: poisonTypeImg,
    psychic: psychicTypeImg,
    rock: rockTypeImg,
    steel: steelTypeImg,
    water: waterTypeImg,
  })
);

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!pokemonList.length) {
        setIsLoading(true);
        const pokeList = await retrievePokemonList();
        setPokemonList(pokeList);
        setIsLoading(false);
      }
    })();
  }, [pokemonList]);

  const loadingSpinnerJSX = (
    <CircularProgress disableShrink className="loading-spinner" />
  );

  const appBodyJSX = (
    <>
      <NavBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Pokedex
              pokemonList={pokemonList}
              pokemonTypeImages={POKEMON_TYPES_IMAGES}
            />
          )}
        />
        <Route
          exact
          path="/pokecardgame"
          render={() => (
            <PokeCardGame
              pokemonList={pokemonList}
              pokemonTypeImages={POKEMON_TYPES_IMAGES}
            />
          )}
        />
        <Route exact path="/compare" render={() => <Compare />} />
      </Switch>
    </>
  );

  return (
    <div className="App">{isLoading ? loadingSpinnerJSX : appBodyJSX}</div>
  );
}

export default App;
